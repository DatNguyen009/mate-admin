import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function useFormWithSaveChecked(props) {
  const { id: idParams } = useParams();
  const [saved, setSaved] = useState(false);

  const useFormState = useForm(props);
  const {
    reset,
    getValues,
    formState: { isDirty, isSubmitSuccessful },
  } = useFormState;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(getValues());
    }

    if (!idParams || isDirty) {
      setSaved(false);
      return;
    }

    setSaved(true);
  }, [isDirty, idParams, isSubmitSuccessful]);

  return {
    ...useFormState,
    saved,
  };
}

export default useFormWithSaveChecked;
