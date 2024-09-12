import * as React from 'react';

const globalUIRef = React.createRef<any>();

function showLoading() {
  globalUIRef.current?.showLoading();
}

function showPrinting() {
  globalUIRef.current?.showPrinting();
}

function hideLoading() {
  globalUIRef.current?.hideLoading();
}

export const GlobalService = {
  showLoading,
  showPrinting,
  hideLoading,
  globalUIRef,
};
