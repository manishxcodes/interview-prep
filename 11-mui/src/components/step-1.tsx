import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormContext } from "react-hook-form";
import type { FormValues } from "../schema";
export const Step1 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      <Typography variant="h6" fontWeight={600} mb={0.5}>
        Basic Information
      </Typography>
      <TextField
        label="Full Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
      />
      <TextField
        label="Email Address"
        type="email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
      />{" "}
      <TextField
        label=" Password"
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
      />
      <TextField
        label=" Phone Number"
        type="phoneNumber"
        {...register("phone")}
        error={!!errors.phone}
        helperText={errors.phone?.message}
        fullWidth
      />
    </Box>
  );
};
