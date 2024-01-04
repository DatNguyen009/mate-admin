import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import React from "react";
import { Button, Container } from "reactstrap";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import { useEffect } from "react";
import httpService from "services/httpService";
import { useParams } from "react-router-dom";
import { TEXT_PUT } from "helpers/name_helper";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";

export default function DetailQuestion() {
  const schema = yup.object({}).required();

  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({ mode: "onBlur", resolver: yupResolver(schema) });

  const { renderForm } = useGetFormSchema("Question", yup, rest, errors);

  const { id } = useParams();
  const url = `/parse/classes/Question/${id}`;

  useEffect(async () => {
    const res = await httpService.get(url);
    rest.reset({ ...res });
  }, [id]);

  const onSubmit = value => {
    httpService
      .put(url, {
        A: value.A,
        B: value.B,
        C: value.C,
        D: value.D,
        content: value.content,
      })
      .then(() => {
        toastrCRUDSuccess("Question", TEXT_PUT);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <HeaderCreateItem>
              <Button>Save</Button>
            </HeaderCreateItem>
            {renderForm()}
          </form>
        </Container>
      </div>
    </React.Fragment>
  );
}
