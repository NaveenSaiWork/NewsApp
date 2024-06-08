import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";
import colors from "../../config/colors";

function SubmitButton({ title, color = "primary" }) {
  console.log(color);
  const { handleSubmit } = useFormikContext();

  return <Button title={title} color={colors.skyBlue} onPress={handleSubmit} />;
}

export default SubmitButton;
