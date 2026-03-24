import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";
import type { FormValues } from "../schema";

export function Step2() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <Box display={"flex"} flexDirection={"column"} gap={2.5}>
      <Typography variant={"h6"} fontWeight={600} mb={0.5}>
        Personal Data
      </Typography>

      <Box>
        <Typography variant="body2" color="text.secondary" mb={1}>
          Gender
        </Typography>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <RadioGroup row {...field}>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          )}
        />
        {errors.gender && (
          <Typography variant="caption" color="error">
            {errors.gender.message}
          </Typography>
        )}
      </Box>
      <Controller
        name="dob"
        control={control}
        render={({ field }) => (
          <DatePicker
            label="Date of Birth"
            value={field.value ? dayjs(field.value) : null}
            onChange={(date) => field.onChange(date)}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!errors.dob,
                helperText: errors.dob?.message as string,
              },
            }}
          />
        )}
      />
      <TextField
        label="Short Bio"
        multiline
        rows={3}
        {...register("bio")}
        error={!!errors.bio}
        helperText={errors.bio?.message}
        fullWidth
        placeholder="Tell us a bit about yourself..."
      />
    </Box>
  );
}
