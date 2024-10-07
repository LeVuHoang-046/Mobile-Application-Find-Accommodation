import { Box, HeaderApp, TextApp } from "@component";
import { CONFIG_SSO, defaultUpdateRoomValue, RouteMain } from "@constants";
import { AppStackParamList, FormsAddBuildingDetail, FormsUpdateRoom } from "@types";
import { FormProvider, useForm } from "react-hook-form";
import { FormRoomInformation } from "./FormRoomInformation";
import { FormButtonFooter } from "./FormButtonFooter";
import { ScrollView } from "react-native-gesture-handler";
import { useStyles } from "react-native-unistyles";
import { stylesheet } from "./style";
import { scaler } from "@themes";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
import { mapGender } from "@utils";
import { pushToastLoading } from "@utils/toast";

type FormUpdateRoomRouteProp = RouteProp<
  AppStackParamList,
  RouteMain.FormUpdateRoom
>;

export const FormUpdateRoom: React.FC = () => {

  const route = useRoute<FormUpdateRoomRouteProp>();
  const {roomData, onRoomUpdateRefetch} = route.params

  const { styles } = useStyles(stylesheet);
  const [loading, setLoading] = useState(true); // Loading state for data fetching

  // Initialize the form with default values
  const forms = useForm<FormsUpdateRoom>({
    defaultValues:  defaultUpdateRoomValue,
    // resolver: zodResolver(AddBuildingDetailSchema),
    mode: "onSubmit",
  });

  // Get `setValue` method from `useForm`
  const { setValue } = forms;

  useEffect(() => {
    // Fetch room details by ID
    const fetchRoomDetails = async () => {
      try {
        // Use `roomData.id` for room ID
        const response = await axios.get(`${CONFIG_SSO.BASE.HOME}/api/boarding-house/room/${roomData?.id}/details`);
        const fetchedRoomData =  response.data.data || response.data;
        console.log("Fetched room data:", fetchedRoomData);


        // Map the response data to the form fields
        setValue("id", fetchedRoomData.id ? fetchedRoomData.id.toString() : "");
        setValue("roomNumber", fetchedRoomData.name);
        setValue("roomPrice", parseFloat(fetchedRoomData.price));
        setValue("deposit", parseFloat(fetchedRoomData.deposit));
        setValue("area", fetchedRoomData.area);
        setValue("floor", fetchedRoomData.floor);
        setValue("capacity", fetchedRoomData.capacity);
        setValue("gender", {
          id: fetchedRoomData.gender,
          label: mapGender(fetchedRoomData.gender),
        });
        setValue(
          "facilities",
          fetchedRoomData.facilities.map((f: any) => ({
            id: f.id,
            label: f.name,
            icon: f.icon,
          }))
        );
        setValue(
          "interior",
          fetchedRoomData.interiors.map((i: any) => ({
            id: i.id,
            label: i.name,
            icon: i.icon,
          }))
        );
        setValue("imageRoom", fetchedRoomData.images);

        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Failed to fetch room details:", error);
        setLoading(false); // Stop loading even if there is an error
      }
    };

    if (roomData && roomData.id) {
      fetchRoomDetails();
    }
  }, [roomData, setValue]); 

// Assuming you have a function to handle the form submission
const handleUpdateRoom = async (data: FormsUpdateRoom) => {
  try {
    // const loading = pushToastLoading('Saving...');
    const facilitiesIds = forms.watch('facilities').map(facility => facility.id);
    const InteriorsIds = forms.watch('interior').map(interior => interior.id);
    const formData = new FormData();
    
    // Append images
    data.imageRoom.forEach(image => {
        formData.append('images[]', {
            uri: image.path,
            type: image.mime,
            name: image.path.split('/').pop(),
        });
    });

    // Append other room data
    formData.append('name', data.roomNumber);
    formData.append('price', data.roomPrice);
    formData.append('area', data.area);
    formData.append('deposit', data.deposit);
    formData.append('floor', data.floor);
    formData.append('capacity', data.capacity);
    formData.append('gender', data.gender.id);
    // formData.append('boarding_house_id', item?.id);
    facilitiesIds.forEach(facilityId => formData.append('facilities[]', facilityId));
    InteriorsIds.forEach(interiorId => formData.append('interiors[]', interiorId));

    // Make the API call to update the room details
    const response = await axios.put(
      `${CONFIG_SSO.BASE.HOME}/api/rooms/${data.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Handle success response
    console.log("Room updated successfully:", response.data);
    onRoomUpdateRefetch()
  } catch (error) {
    // Handle error response
    console.error("Failed to update room details:", error);
  }
};



  return (
    <Box flex={1}>
      <HeaderApp title="Update Room" goBack />
      {loading ? (
        <Box flex={1} justify="center" align="center">
          {/* Add a loading spinner or message */}
          <TextApp>Loading...</TextApp>
        </Box>
      ) : (
        <FormProvider {...forms}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <Box mt={scaler(10)} rowGap={scaler(10)} flex={1}>
              <FormRoomInformation/>
            </Box>
          </ScrollView>
              <FormButtonFooter
                onCallbackSave={(updatedRoomData) => {
                  handleUpdateRoom(updatedRoomData); // Call form submission function
                }}
                existingRoom={forms.getValues()} // Pass current form values as existing room
              />
        </FormProvider>
      )}
    </Box>
  );
};
