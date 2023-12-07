import { Box, TextField, Switch, Stack } from "@mui/material";
import CommonPage from "../../../components/common-page/common-page";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";

import { IFileItem } from "../../../services/types";
import { VisuallyHiddenInput } from "./update.styled";

export default function Update() {
  const { car_id } = useParams(); // Using useParams within the functional component
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [loadingCover, setLoadingCover] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [fileItem, setFileItem] = useState<IFileItem>();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8060/api/cars/${car_id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const bookData = response.data.data;
        setFormValues(bookData);
      } catch (error) {
        console.log("error > ", error);
      }
    };

    fetchBookData();
  }, [car_id]);

  console.log("bookData > ", formValues);

  const handleUploadCover = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      try {
        setLoadingCover(true);
        const formData = new FormData();
        formData.append("image", files[0]);

        const response = await axios.post(
          "http://localhost:8060/api/cars/upload",
          formData,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setFileItem(response.data.data);
      } catch (error) {
        console.log("error > ", error);
      } finally {
        setLoadingCover(false);
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      setLoadingSubmit(true);
      const payload = { ...formValues, image: fileItem?.secure_url };

      console.log(payload);

      await axios.put(`http://localhost:8060/api/cars/${car_id}`, payload, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      navigate(-1);
    } catch (error) {
      console.log("error > ", error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <CommonPage
      withBack
      component={"form"}
      title="Create new Car"
      actionElement={
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loadingSubmit}
        >
          Submit
        </LoadingButton>
      }
      onSubmit={handleSubmit}
    >
      <Box
        sx={{
          width: "50%",
        }}
      >
        <TextField
          value={formValues.plate}
          name="plate"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Plate"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              plate: e.target.value,
            })
          }
          variant="filled"
        />
        <TextField
          value={formValues.manufacture}
          name="manufacture"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Manufacture"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              manufacture: e.target.value,
            })
          }
          variant="filled"
        />
        <TextField
          value={formValues.model}
          name="model"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Model"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              model: e.target.value,
            })
          }
          variant="filled"
        />
        <TextField
          value={formValues.type}
          name="type"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Type"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              type: e.target.value,
            })
          }
          variant="filled"
        />
        <TextField
          value={formValues.description}
          name="description"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Description"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              description: e.target.value,
            })
          }
          variant="filled"
        />
        <TextField
          value={formValues.transmission}
          name="transmission"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Transmission"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              transmission: e.target.value,
            })
          }
          variant="filled"
        />
        <TextField
          value={formValues.capacity}
          name="capacity"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Capacity"
          type="number"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              capacity: Number(e.target.value),
            })
          }
          variant="filled"
        />
        <TextField
          value={formValues.rentPerDay}
          name="rentPerDay"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Rent /Day"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              rentPerDay: e.target.value,
            })
          }
          variant="filled"
        />
        <Box>
          
          <div>AVailable At: </div>
          <DateTimePicker
            onChange={(newValue) =>
              setFormValues({
                ...formValues,
                availableAt: newValue || "",
              })
            }
          />
        </Box>
        <Box>
          <Stack direction={"row"} alignItems={"center"}>
            <div>AVailable</div>
            <Switch
              name="available"
              title="Available"
              checked={formValues && formValues.available}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  available: e.target.checked,
                })
              }
            />
          </Stack>
        </Box>
        <TextField
          value={formValues.year}
          name="year"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Year"
          type="number"
          onChange={(e) =>
            setFormValues({
              ...formValues,
              year: Number(e.target.value),
            })
          }
          variant="filled"
        />
        <LoadingButton
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ mb: 3 }}
          loading={loadingCover}
        >
          Upload Book Cover
          <VisuallyHiddenInput
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleUploadCover}
          />
        </LoadingButton>
        {formValues && formValues.image && (
          <Box>
            <img
              src={
                fileItem
                  ? fileItem.secure_url
                  : formValues.image
              }
              alt="preview"
              style={{ width: "100%", objectFit: "cover" }}
            />
          </Box>
        )}
      </Box>
    </CommonPage>
  );
}
