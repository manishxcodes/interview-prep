import { Controller, useFormContext, useWatch } from "react-hook-form";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { FormValues } from "../schema";

const SKILL_OPTIONS = [
  "React",
  "Node.js",
  "Python",
  "TypeScript",
  "Go",
  "Rust",
  "Java",
  "AWS",
];

export function Step4() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  const relocate = useWatch({ control, name: "relocate" });

  return (
    <Box display="flex" flexDirection="column" gap={2.5}>
      <Typography variant="h6" fontWeight={600}>
        Preferences
      </Typography>

      {/* ── Skills ── */}
      <Box>
        <Typography variant="body2" color="text.secondary" mb={1}>
          Skills (select all that apply)
        </Typography>

        <Controller
          name="skills"
          control={control}
          render={({ field }) => (
            <Box display="flex" flexWrap="wrap" gap={1}>
              {SKILL_OPTIONS.map((skill) => {
                const checked = field.value?.includes(skill);
                return (
                  <Chip
                    key={skill}
                    label={skill}
                    clickable
                    color={checked ? "primary" : "default"}
                    variant={checked ? "filled" : "outlined"}
                    onClick={() => {
                      const current: string[] = field.value ?? [];

                      field.onChange(
                        checked
                          ? current.filter((s) => s !== skill)
                          : [...current, skill],
                      );
                    }}
                  />
                );
              })}
            </Box>
          )}
        />

        {errors.skills && (
          <Typography variant="caption" color="error" display="block" mt={0.5}>
            {errors.skills.message as string}
          </Typography>
        )}
      </Box>

      {/* ── Relocate ── */}
      <Box>
        <Typography variant="body2" color="text.secondary" mb={1}>
          Open to Relocation?
        </Typography>
        <Controller
          name="relocate"
          control={control}
          render={({ field }) => (
            <RadioGroup row {...field}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          )}
        />
        {errors.relocate && (
          <Typography variant="caption" color="error" display="block">
            {errors.relocate.message as string}
          </Typography>
        )}
      </Box>

      {/* ── Preferred location (conditional) ── */}
      {relocate === "yes" && (
        <TextField
          label="Preferred Location"
          {...register("location")}
          error={!!errors.location}
          helperText={errors.location?.message}
          fullWidth
          placeholder="e.g. Bangalore, Mumbai..."
        />
      )}

      {/* ── Expected Salary ── */}
      <TextField
        label="Expected Salary (₹ per annum)"
        {...register("expectedSalary")}
        error={!!errors.expectedSalary}
        helperText={errors.expectedSalary?.message}
        fullWidth
        placeholder="e.g. 12,00,000"
      />
    </Box>
  );
}
