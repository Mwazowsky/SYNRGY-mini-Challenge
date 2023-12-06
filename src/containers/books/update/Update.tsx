import { Box, TextField, Switch, Stack, styled } from "@mui/material";
import CommonPage from "../../../components/common-page/common-page";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";

import { VisuallyHiddenInput } from "./update.styled";
import { IFileItem } from "../../../services/types";

export default function Update() {
  const { id } = useParams(); // Using useParams within the functional component
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [loadingCover, setLoadingCover] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [fileItem, setFileItem] = useState<IFileItem>();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/books/${id}`,
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
  }, [id]);

  console.log("bookData > ", formValues);

  const handleUploadCover = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      try {
        setLoadingCover(true);
        const formData = new FormData();
        formData.append("cover", files[0]);

        const response = await axios.post(
          "http://localhost:8000/api/books/upload",
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
      const payload = { ...formValues, cover: fileItem };
      await axios.put(`http://localhost:8000/api/books/${id}`, payload, {
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
      title="Create new Book"
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
          name="title"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Title"
          value={formValues.title || ""}
          onChange={(e: { target: { value: any } }) =>
            setFormValues({
              ...formValues,
              title: e.target.value,
            })
          }
        />
        <TextField
          name="author"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Author"
          value={formValues.author || ""}
          onChange={(e: { target: { value: any } }) =>
            setFormValues({
              ...formValues,
              author: e.target.value,
            })
          }
        />
        <TextField
          name="isbn"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="ISBN"
          value={formValues.isbn || ""}
          onChange={(e: { target: { value: any } }) =>
            setFormValues({
              ...formValues,
              isbn: e.target.value,
            })
          }
        />
        <TextField
          name="published_year"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Published Year"
          type="number"
          value={formValues.published_year || ""}
          onChange={(e: { target: { value: any } }) =>
            setFormValues({
              ...formValues,
              published_year: e.target.value,
            })
          }
        />
        <TextField
          name="genre"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Genre"
          value={formValues.genre || ""}
          onChange={(e: { target: { value: any } }) =>
            setFormValues({
              ...formValues,
              genre: e.target.value,
            })
          }
        />
        <TextField
          name="total_copies"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Total Copies"
          type="number"
          value={formValues.total_copies || ""}
          onChange={(e: { target: { value: any } }) =>
            setFormValues({
              ...formValues,
              total_copies: e.target.value,
            })
          }
        />
        <TextField
          name="copies_available"
          size="small"
          sx={{ width: "100%", mb: 3 }}
          label="Copies Available"
          type="number"
          value={formValues.copies_available || ""}
          onChange={(e: { target: { value: any } }) =>
            setFormValues({
              ...formValues,
              copies_available: e.target.value,
            })
          }
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
        {formValues && formValues.cover && (
          <Box>
            <img
              src={
                fileItem
                  ? fileItem.secure_url
                  : formValues.cover["secure_url"]
              }
              alt="preview"
              style={{ width: "100%", objectFit: "cover" }}
            />
          </Box>
        )}

        <Box>
          <Stack direction={"row"} alignItems={"center"}>
            <div>Publish</div>
            <Switch
              name="published"
              title="Published"
              checked={formValues && formValues.published}
              onChange={(e: { target: { checked: any } }) =>
                setFormValues({
                  ...formValues,
                  published: e.target.checked,
                })
              }
            />
          </Stack>
        </Box>
      </Box>
    </CommonPage>
  );
}
