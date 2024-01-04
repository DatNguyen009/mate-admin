import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container } from "reactstrap";
import useGetFormSchema from "custom-hook/useGetFormSchema";
import HeaderCreateItem from "components/Common/HeaderCreateItem";
import { CommonButton } from "components/Common/ButtonCommon";
import httpService from "services/httpService";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toastrCRUDSuccess } from "components/Common/AlertToastr";
import { TEXT_POST, TEXT_PUT } from "helpers/name_helper";

const NewTemplate = () => {
  const [modelOptions, setModelOptions] = useState([]);
  const [isSignature, setIsSignature] = useState(false);
  const { id } = useParams();

  const schema = yup.object({}).required();

  const includeFunctions = {
    model: {
      options: modelOptions,
    },
    Signature: {
      onChange: e => setIsSignature(e.target.checked),
    },
  };

  useEffect(async () => {
    const res = await httpService.get("/parse/schemas");
    const options = _.orderBy(
      res.results.map(({ className }, index) => ({
        index,
        name: className,
        value: className,
      })),
      ["name"],
      ["asc"]
    );
    setModelOptions(options);
  }, []);

  const {
    handleSubmit,
    formState: { errors },
    ...rest
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { renderForm, content, getContent } = useGetFormSchema(
    "Template",
    yup,
    rest,
    errors
  );

  useEffect(async () => {
    if (!id) return;

    try {
      const url = "/parse/classes/Template/" + id;
      const response = await httpService.get(url);
      const { reset } = rest;
      const contentSplitStart = response.content.split("<header>");
      const contentSplitEnd = contentSplitStart[1].split("</header>");
      reset({ ...response, content: contentSplitEnd[0] });
      getContent({ ...response, content: contentSplitEnd[0] });
      setIsSignature(response.Signature);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const onSubmit = async values => {
    const { createdAt, updatedAt, ...template } = values;

    const signatureString = `<div class="center" style="display: flex; justify-content: space-evenly", width: 85%, margin: auto>
          <figure >
              <figcaption sty><strong>Đại diện Bên A</strong></figcaption>
                {% if fullCustomer.fullName %}
                    <img src="https://vset.live1.vn/parse/files/SCWASRTWK1Y9AVMP1KFC/95130022cc9c7e81baed0621e7f70001_signatureOfVSJ.png"
                        alt="" width="110"/>
                {% endif %}
              </figure>
          <figure >
              <figcaption><strong>Đại diện Bên B</strong></figcaption>
              <img src="{{ signature.url }}" alt="" width="110" height="110" />
          </figure>
      </div>`;

    const contentString = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
          body {
            margin: auto;
            width: 85%;
            height: 0%;
          }
    
          .center {
            text-align: center;
          }
        </style>
      </head>
      <body>
      <header>${content}</header>
      <footer>${isSignature ? signatureString : ""}</footer>
      </body>
    </html>
    `;
    if (id) {
      httpService.put(`/parse/classes/Template/${id}`, {
        ...template,
        content: contentString,
      });
      toastrCRUDSuccess("Template", TEXT_PUT);

      return;
    }
    httpService.post("/parse/classes/Template", {
      ...template,
      content: contentString,
    });
    toastrCRUDSuccess("Template", TEXT_POST);
  };

  return (
    <div className="page-content">
      <Container fluid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeaderCreateItem title={"Add / Edit Template"}>
            <CommonButton level={0}>Save</CommonButton>
          </HeaderCreateItem>
          {renderForm([], includeFunctions)}
        </form>
      </Container>
    </div>
  );
};

export default NewTemplate;
