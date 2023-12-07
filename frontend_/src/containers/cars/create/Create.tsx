import { Box, TextField, Switch, Stack } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { CloudUpload } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import CommonPage from "../../../components/common-page";
import useAction from "./create.hooks";
import { VisuallyHiddenInput } from "./create.styled";

export default function Create() {
  const {
    formValues,
    handleSubmit,
    handleUploadCover,
    loadingCover,
    loadingSubmit,
    setFormValues,
    fileItem,
  } = useAction();

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
          value={formValues?.plate}
        />
        <TextField
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
          startIcon={<CloudUpload />}
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
      </Box>
    </CommonPage>
  );
}
