import { Box, TextField, Switch, Stack, styled } from "@mui/material";
import CommonPage from "../../components/common-page/common-page";
import { ChangeEvent, FormEvent, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

const VisuallyHiddenInput = styled("input")`
  display: none;
`;

interface IFileItem {
  url: string;
  secure_url: string;
  width?: number;
  height?: number;
  resourceType?: string;
}

export default function Create() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [loadingCover, setLoadingCover] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [fileItem, setFileItem] = useState<IFileItem>();

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
      await axios.post("http://localhost:8000/api/books", payload, {
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
          onChange={(e: { target: { value: any; }; }) =>
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
          onChange={(e: { target: { value: any; }; }) =>
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
          onChange={(e: { target: { value: any; }; }) =>
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
          onChange={(e: { target: { value: any; }; }) =>
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
          onChange={(e: { target: { value: any; }; }) =>
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
          onChange={(e: { target: { value: any; }; }) =>
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
          onChange={(e: { target: { value: any; }; }) =>
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
        {fileItem && fileItem.url && (
          <Box>
            <img
              src={fileItem.secure_url}
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
              onChange={(e: { target: { checked: any; }; }) =>
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
