import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { formSchema, STEP_FIELDS, STEPS, type FormValues } from "../schema";
import { Step1 } from "./step-1";
import { Step2 } from "./step-2";
import { Step3 } from "./step-3";
import { Step4 } from "./step-4";
import { Step5 } from "./step-5";

// Recursively collect all error messages from nested error objects
function collectErrorMessages(errs: Record<string, any>): string[] {
  const msgs: string[] = [];
  for (const val of Object.values(errs)) {
    if (!val) continue;
    if (Array.isArray(val)) {
      val.forEach((item) => {
        if (item && typeof item === "object")
          msgs.push(...collectErrorMessages(item));
      });
    } else if (typeof val === "object") {
      if (val.message && typeof val.message === "string") {
        msgs.push(val.message);
      } else {
        msgs.push(...collectErrorMessages(val));
      }
    }
  }
  return msgs;
}

export default function StepForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      gender: undefined,
      dob: null,
      bio: "",
      degrees: [{ degree: "", college: "", year: "" }],
      skills: [],
      relocate: undefined,
      location: "",
      expectedSalary: "",
    },
  });

  const {
    trigger,
    formState: { errors },
  } = methods;

  // Show toasts whenever errors update after a failed Next attempt
  useEffect(() => {
    const messages = collectErrorMessages(errors as Record<string, any>);
    if (messages.length === 0) return;
    messages.slice(0, 3).forEach((msg, i) => {
      setTimeout(() => toast.error(msg, { duration: 3500 }), i * 200);
    });
  }, [errors]);

  const handleNext = async () => {
    const fields = STEP_FIELDS[activeStep];
    const isValid = await trigger(fields.length ? (fields as any) : undefined);

    if (!isValid) {
      const messages = collectErrorMessages(
        methods.formState.errors as Record<string, any>,
      );
      if (messages.length === 0) {
        toast.error("Please fix the errors before continuing.");
      }
      // Individual field toasts are shown via the useEffect above
      return;
    }
    setActiveStep((p) => p + 1);
  };

  const handleBack = () => setActiveStep((p) => p - 1);

  const handleSubmit = (data: FormValues) => {
    localStorage.setItem("stepFormData", JSON.stringify(data));
    toast.success("Submitted! Data saved to localStorage 🎉", {
      duration: 4000,
    });
    setSubmitted(true);
    console.log("Submitted:", data);
  };

  const handlePreview = () => {
    const data = methods.getValues();
    console.log("Preview data:", data);
    alert(JSON.stringify(data, null, 2));
    toast("Preview printed to console", { icon: "👁️" });
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 />;
      case 2:
        return <Step3 />;
      case 3:
        return <Step4 />;
      case 4:
        return <Step5 />;
      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <Box maxWidth={640} mx="auto" mt={8} textAlign="center">
        <Paper sx={{ p: 6 }}>
          <Typography variant="h4" mb={2}>
            🎉 Application Submitted!
          </Typography>
          <Typography color="text.secondary" mb={3}>
            Your data has been saved to <code>localStorage</code>.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              setSubmitted(false);
              setActiveStep(0);
              methods.reset();
            }}
          >
            Fill Again
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Toaster
        position="top-right"
        toastOptions={{ style: { fontFamily: "inherit", fontSize: 14 } }}
      />

      <FormProvider {...methods}>
        <Box maxWidth={680} mx="auto" mt={5} px={2} pb={6}>
          <Typography variant="h5" fontWeight={700} mb={4} textAlign="center">
            Job Application Form
          </Typography>

          {/* Stepper */}
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {STEPS.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Step Content */}
          <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
            {renderStep()}
          </Paper>

          {/* Navigation */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
            >
              ← Back
            </Button>

            <Box display="flex" gap={1.5}>
              {activeStep === STEPS.length - 1 ? (
                <>
                  <Button variant="outlined" onClick={handlePreview}>
                    Preview
                  </Button>
                  <Button
                    variant="contained"
                    onClick={methods.handleSubmit(handleSubmit)}
                  >
                    Submit →
                  </Button>
                </>
              ) : (
                <Button variant="contained" onClick={handleNext}>
                  Next →
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </FormProvider>
    </LocalizationProvider>
  );
}
