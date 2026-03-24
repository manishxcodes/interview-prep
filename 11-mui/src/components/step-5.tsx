import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";
import type { FormValues } from "../schema";

function ReviewRow({ label, value }: { label: string; value?: string }) {
  return (
    <Box display="flex" py={0.75} gap={2}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ minWidth: 160, flexShrink: 0 }}
      >
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={500}>
        {value || "—"}
      </Typography>
    </Box>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Paper variant="outlined" sx={{ p: 2.5 }}>
      <Typography variant="subtitle1" fontWeight={700} mb={1.5}>
        {title}
      </Typography>
      <Divider sx={{ mb: 1.5 }} />
      {children}
    </Paper>
  );
}

export function Step5() {
  const { getValues } = useFormContext<FormValues>();
  const data = getValues();

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6" fontWeight={600} mb={0.5}>
        Review Your Application
      </Typography>

      <SectionCard title="Basic Info">
        <ReviewRow label="Full Name" value={data.name} />
        <ReviewRow label="Email" value={data.email} />
        <ReviewRow label="Phone" value={data.phone} />
      </SectionCard>

      <SectionCard title="Personal">
        <ReviewRow
          label="Gender"
          value={
            data.gender
              ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1)
              : undefined
          }
        />
        <ReviewRow
          label="Date of Birth"
          value={data.dob ? dayjs(data.dob).format("DD MMM YYYY") : undefined}
        />
        <ReviewRow label="Bio" value={data.bio} />
      </SectionCard>

      <SectionCard title="Education">
        {data.degrees?.map((d, i) => (
          <Box key={i} mb={i < data.degrees.length - 1 ? 1.5 : 0}>
            <Typography variant="body2">
              <strong>{d.degree}</strong> &mdash; {d.college}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Graduation Year: {d.year}
            </Typography>
          </Box>
        ))}
      </SectionCard>

      <SectionCard title="Preferences">
        <Box mb={1.5}>
          <Typography variant="body2" color="text.secondary" mb={0.75}>
            Skills
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={0.75}>
            {data.skills?.map((s) => (
              <Chip key={s} label={s} size="small" color="primary" />
            ))}
          </Box>
        </Box>
        <ReviewRow
          label="Open to Relocation"
          value={data.relocate === "yes" ? "Yes" : "No"}
        />
        {data.relocate === "yes" && (
          <ReviewRow label="Preferred Location" value={data.location} />
        )}
        <ReviewRow label="Expected Salary" value={`₹ ${data.expectedSalary}`} />
      </SectionCard>
    </Box>
  );
}
