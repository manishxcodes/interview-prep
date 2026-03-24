import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { FormValues } from "../schema";

export const Step3 = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "degrees",
  });

  return (
    <Box display={"flex"} flexDirection={"column"} gap={2.5}>
      <Typography variant="h6" fontWeight={600} mb={0.5}>
        Education
      </Typography>
      {fields.map((field, index) => (
        <Paper key={field.id} variant="outlined" sx={{ p: 2 }}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={1.5}
          >
            <Typography variant="subtitle2" color="primary">
              Degree #{index + 1}
            </Typography>
            {fields.length > 1 && (
              <Button size="small" color="error" onClick={() => remove(index)}>
                Remove
              </Button>
            )}
          </Box>
          <Box display={"flex"} gap={2} flexWrap={"wrap"}>
            <TextField
              label="Degree"
              {...register(`degrees.${index}.degree`)}
              error={!!errors.degrees?.[index]?.degree}
              helperText={errors.degrees?.[index]?.degree?.message}
              sx={{ flex: "1 1 150px" }}
              placeholder="B. Tech, MBA.."
            />
            <TextField
              label="Year"
              {...register(`degrees.${index}.year`)}
              error={!!errors.degrees?.[index]?.year}
              helperText={errors.degrees?.[index]?.year?.message}
              sx={{ flex: "1 1 100px" }}
              placeholder="2023"
            />
          </Box>
        </Paper>
      ))}

      {errors.degrees?.root && (
        <Alert severity="error">{errors.degrees.root.message}</Alert>
      )}
      {errors.degrees?.message && (
        <Alert severity="error">{errors.degrees.message}</Alert>
      )}

      <Button
        variant="outlined"
        onClick={() => append({ degree: "", college: "", year: "" })}
        fullWidth
      >
        + Add Another Degree
      </Button>
    </Box>
  );
};
