import React, { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  fetchPetSitter,
  updatePetSitter,
  savePetSitterPhoto,
} from "../api/petSittersApi";
import { Formik } from "formik";
import * as yup from "yup";
import defaultPetSitterImage from "../../../assets/Images/defaultPetSitter.jpg";
import DisplayData from "../data/petSitters.json";
import PetSitterForm from "../components/Form";
import { isDisplayMode, PHOTO_API_BASE_URL } from "../../../shared/config/env";
import { useParams } from "react-router-dom";
import AsyncWrapper from "../../../shared/components/AsyncWrapper";

const schema = yup.object().shape({
  title: yup.string().required().max(75),
  description: yup.string().required().min(5),
  location: yup.string().required(),
  price: yup.number().required().min(1),
});

const PetSitterEdit = () => {
  const [petSitter, setPetSitter] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    photoFileName: "defaultPetSitter.png",
  });
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();


  const [selectedImage, setSelectedImage] = useState();

  const onFieldChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setPetSitter({ ...petSitter, [name]: value });
  };

  const imageHandleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const image = URL.createObjectURL(file);
      setPetSitter({ ...petSitter, photoFileName: file.name });
      setSelectedImage(image);
      URL.revokeObjectURL(file);

      var formData = new FormData();
      formData.append("myFile", file, file.name);

      setFile(formData);
    }
  };

  const getPetSitter = async () => {
    if (isDisplayMode) {
      setPetSitter(DisplayData[id]);
      setSelectedImage(defaultPetSitterImage);
      setLoading(false);
      setError(null);
    } else {
      setLoading(true);
      const response = await fetchPetSitter(id)

      if (response.error) {
        setError(response.error);
      } else {
        setPetSitter(response.data);
        setSelectedImage(
          PHOTO_API_BASE_URL + response.data.photoFileName
        );
        setError(null);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getPetSitter();
  }, []);

  const editPetSitter = async () => {
    await updatePetSitter(petSitter, id);
    await savePetSitterPhoto(file);
  };

  const onSubmitForm = () => {
    editPetSitter();
    navigate(`/petSitters/${petSitter.id}`);
  };

  return (
    <div className="mt-3 col-md-6 offset-md-3">
      <h1 className="d-flex justify-content-center">
        <Badge bg="success">Edit Pet Sitter</Badge>
      </h1>
      <AsyncWrapper loading={loading} error={error}>
        {petSitter && (
          <Formik
            validationSchema={schema}
            onSubmit={onSubmitForm}
            initialValues={petSitter}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <PetSitterForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                touched={touched}
                errors={errors}
                isValid={isValid}
                onFieldChange={onFieldChange}
                imageHandleChange={imageHandleChange}
                selectedImage={selectedImage}
                submitDisabled={!isValid}
              />
            )}
          </Formik>
        )}
      </AsyncWrapper>
    </div>
  );
};

export default PetSitterEdit;
