import {Icons} from '@assets';
import {
  BottomSheetPickerMultilineApp,
  BottomSheetPickerType,
  Box,
  BoxFormTitle,
  Row,
  TextApp,
  TextFormApp,
  TouchableApp,
} from '@component';
import {LineApp} from '@component/LineApp';
import {ColorsStatic, EKeySheet} from '@constants';
import {FontSize, scaler} from '@themes';
import {FormsAddListRoom} from '@types';
import {memo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {useStyles} from 'react-native-unistyles';

import ImagePicker, {Image, Video} from 'react-native-image-crop-picker';
import {Image as RNImage} from 'react-native';
import VideoPlayer from 'react-native-video';
import { useQuerInteriorsFilter, useQueryFacilitiesFilter } from '@api';
import { getIconById, mapGender } from '@utils';
import { stylesheet } from '../style';

export const FormRoomInformation: React.FC = memo(() => {
  const {styles} = useStyles(stylesheet);

  const init = Array(3)
    .fill(0)
    .map((_, i) => ({label: mapGender(i), id: (i)}));
  const {
    watch,
    getValues,
    setValue,
    formState,
    control,
    formState: {errors},
    clearErrors,
  } = useFormContext<FormsAddListRoom>();
  console.log('Form values:', getValues());

  const [imageRoom, setImageRoom] = useState<Image[]>(watch('imageRoom') || []);
  const [videoRoom, setVideoRoom] = useState<Video[]>(watch('videoRoom') || []);

  const {data: facilities} = useQueryFacilitiesFilter();
 
  const {data: interiors} = useQuerInteriorsFilter();

  const facilitiesList = facilities?.map(facility => ({
    id: facility.id, 
    icon: ({ size, color }: any) => getIconById(facility.icon) || <Icons.Person size={size} color={color} />, // Provide a default icon if null
    label: facility.name,
    
  })) || [];

  const interiorsList = interiors?.map(interior => ({
    id: interior.id,
    icon: ({ size, color }: any) => getIconById(interior.icon) || <Icons.Person size={size} color={color} />, // Provide a default icon if null
    label: interior.name,
  })) || [];

  // Function to handle image picking
  const handleSelectImage = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      maxFiles: 10,
    })
      .then(images => {
        // Convert picked images into your Image type
        const selectedImages: Image[] = images.map(image => ({
          path: image.path,
          mimeType: image.mime, // or image.mimeType based on your picker
          mime: image.mime,
          size: image.size,
          width: image.width,
          height: image.height,
        }));

        setImageRoom(selectedImages); // Update local state
        setValue('imageRoom', selectedImages); // Update form value
      })
      .catch(error => {
        console.log('Error picking images: ', error);
      });
  };
  const formData = new FormData()
 // Function to log FormData contents
const logFormDataParts = (formData:any) => {
  const parts = formData['_parts'];
  console.log('FormData parts:', parts);
};

// After appending images to formData
imageRoom.forEach(image => {
  formData.append('imageRoom[]', {
    uri: image.path,
    type: image.mime,
    name: image.path.split('/').pop(),
  });
});

// Log FormData parts
logFormDataParts(formData);




  const handleDeleteImage = (index: number) => {
    const updatedImages = imageRoom.filter((_, i) => i !== index);
    setImageRoom(updatedImages);
    setValue('imageRoom', updatedImages);
  };
  const handleSelectVideo = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    })
      .then(video => {
        setVideoRoom([video]); // Store the video object
        setValue('videoRoom', [video]); // Update form value
      })
      .catch(error => {
        console.log('Error picking video: ', error);
      });
  };
  const handleDeleteVideo = () => {
    setVideoRoom([]);
    setValue('videoRoom', []);
  };
  return (
    <Box color={ColorsStatic.white} p={scaler(10)} rowGap={scaler(15)}>
      <Box rowGap={scaler(5)}>
        <TextApp
          weight={700}
          size={FontSize.Font16}
          color={ColorsStatic.orange3}>
          Room information
        </TextApp>
      </Box>

      <TextFormApp
        title="Room number/name"
        require
        iconLeft={<Icons.Pencil size={18} />}
        placeholder="Type room number/name"
        control={control}
        name="roomNumber"
      />
      <TextFormApp
        title="Room price"
        require
        iconLeft={<Icons.Money />}
        placeholder="Type room price"
        control={control}
        name="roomPrice"
        keyboardType="numeric"
      />
      <LineApp />

      <BoxFormTitle rowGap={scaler(10)}>
        <Row columnGap={scaler(15)} flexWrap="wrap">
          {imageRoom.map((image, index) => (
            <Box key={index} p={scaler(5)}>
              <RNImage source={{uri: image.path}} style={styles.image} />
              <TouchableApp
                onPress={() => handleDeleteImage(index)}
                style={styles.buttonDelImage}>
                <Icons.X_Mark size={12} color={ColorsStatic.white} />
              </TouchableApp>
            </Box>
          ))}
          <TouchableApp style={styles.buttonImage} onPress={handleSelectImage}>
            <Icons.Camera size={20} color={ColorsStatic.gray1} />
          </TouchableApp>
          {imageRoom.length > 0 ? null : (
            <Box rowGap={scaler(5)}>
              <TextApp weight={600} size={FontSize.Font14}>
                Image room
              </TextApp>
              <TextApp
                weight={600}
                color={ColorsStatic.gray1}
                size={FontSize.Font14}>
                Max 10 image
              </TextApp>
            </Box>
          )}
        </Row>

        {videoRoom.length > 0 ? (
          <Box p={scaler(5)} height={scaler(300)}>
            {videoRoom.map((video, index) => (
              <VideoPlayer
                key={index}
                source={{uri: video.path}}
                style={styles.video}
                resizeMode="stretch"
                // controls //  display video controls (play/pause, etc.)
              />
            ))}
            <TouchableApp
              onPress={handleDeleteVideo}
              style={styles.buttonDelVideo}>
              <Icons.X_Mark size={12} color={ColorsStatic.white} />
            </TouchableApp>
          </Box>
        ) : (
          <TouchableApp style={styles.buttonVideo} onPress={handleSelectVideo}>
            <Icons.Video color={ColorsStatic.gray1} />
            <TextApp size={FontSize.Font14} weight={700}>
              Video
            </TextApp>
          </TouchableApp>
        )}
      </BoxFormTitle>
      <LineApp />
      <TextFormApp
        title="Deposit"
        require
        iconLeft={<Icons.Money />}
        placeholder="Type deposit"
        control={control}
        name="deposit"
        keyboardType="numeric"
      />
      <TextFormApp
        title="Area (m²)"
        require
        iconLeft={<Icons.Area size={18} color={ColorsStatic.orange3} />}
        placeholder="Type area"
        control={control}
        name="area"
        keyboardType="numeric"
      />
      <TextFormApp
        title="Floor"
        iconLeft={<Icons.Stair size={18} />}
        placeholder="Type floor"
        control={control}
        name="floor"
        keyboardType="numeric"
      />
      <TextFormApp
        title="Capacity (person/room)"
        iconLeft={<Icons.People size={18} color={ColorsStatic.orange3} />}
        placeholder="Type number person/room"
        control={control}
        name="capacity"
        keyboardType="numeric"
      />
      <BoxFormTitle title="Gender">
        <BottomSheetPickerType
          list={init}
          keySheet={EKeySheet.Gender}
          itemSelected={watch('gender')}
          title="Gender"
          hideIcon
          onChange={item => {
            setValue('gender', item);
          }}
        />
      </BoxFormTitle>
      <LineApp />
      <BoxFormTitle title="Facilities" require>
        <BottomSheetPickerMultilineApp
          style={styles.picker(!!errors.facilities)}
          listSelected={watch('facilities')}
          list={facilitiesList}
          keySheet={EKeySheet.Facilities}
          onChange={list => {
            const updatedFacilities = list.map(facility => ({
              id: facility.id, // Ensure `id` is passed along
              label: facility.label,
              icon: facility.icon,
            }));
        
            setValue('facilities', updatedFacilities, { shouldDirty: true });
            if (!!errors.facilities) {
              clearErrors('facilities');
            }
          }}
        />
      </BoxFormTitle>
      <BoxFormTitle title="Interior" require>
        <BottomSheetPickerMultilineApp
          style={styles.picker(!!errors.interior)}
          listSelected={watch('interior')}
          list={interiorsList}
          keySheet={EKeySheet.Interior}
          onChange={list => {
            const updatedInteriors = list.map(interior => ({
              id: interior.id, // Ensure `id` is passed along
              label: interior.label,
              icon: interior.icon,
            }));
        
            setValue('interior', updatedInteriors, { shouldDirty: true });
            if (!!errors.interior) {
              clearErrors('interior');
            }
          }}
        />
      </BoxFormTitle>
    </Box>
  );
});
