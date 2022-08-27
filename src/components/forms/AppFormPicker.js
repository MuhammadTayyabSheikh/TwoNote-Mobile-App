import React from 'react';
import { useFormikContext } from 'formik'

import AppPicker from '../AppPicker';
import ErrorMessage from './ErrorMessage';
import colors from '../../config/colors';

function AppFormPicker({ items, name, icon, setIcon, placeholder, width, PickerItemComponent, numberOfColumns }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <AppPicker
        icon={icon}
        setIcon={setIcon}
        items={items}
        onSelectItem={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        placeholderTextColor={colors.medium}
        selectedItem={values[name]}
        width={width}
        PickerItemComponent={PickerItemComponent}
        numberOfColumns={numberOfColumns}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;