import {
  Stack,
  Slider,
  styled,
  type SliderProps,
  createTheme,
  ThemeProvider,
  Typography,
  Button,
} from "@mui/material";
import Container from "@mui/material/Container";

import { useState } from "react";

// const GENDERS = ["Male", "Female", "Prefer Not to Say", "Others"] as const;
// type Gender = (typeof GENDERS)[number];

const CustomSlider = styled(Slider)<SliderProps>(({ theme }) => ({
  width: theme.spacing(10),
  color: theme.palette.success.light,

  "& .MuiSlider-thumb": {
    "&:hover, &.Mui-focusVisible": {
      backgroundColor: "pink",
    },
  },
}));

/* ____________________________________________________________________________ */

// yoiu can calso pass custom prosps to custom elements
type CustomSliderWithErrorProps = SliderProps & {
  error?: boolean;
};

/* here the styled utility gts all the props but error is not passed to dom element using shouldForwardProps */
const CustomSliderWtihError = styled(Slider, {
  shouldForwardProp: (prop) => prop !== "error",
})<CustomSliderWithErrorProps>(({ theme, error }) => ({
  color: error ? theme.palette.error.main : theme.palette.success.main,
  "&.Mui-disabled": {
    "& .MuiSlider-thumb": {
      backgroundColor: error
        ? theme.palette.error.main
        : theme.palette.grey[400],
    },
  },
}));

/* ____________________________________________________________________________ */

const theme = createTheme({
  typography: {
    fontFamily: "Inter Variable",
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        variant: "contained",
      },
      styleOverrides: {
        root: {
          fontSize: "14px",
          variants: [
            {
              props: {
                variant: "outlined",
                color: "secondary",
              },
              style: {
                fontSize: ".5rem",
              },
            },
          ],
        },
      },
    },
  },
});

function App() {
  // const [gender, setGender] = useState<Gender>("Others");
  const [loading, setLoading] = useState(true);

  // function isGender(value: string): value is Gender {
  //   return GENDERS.includes(value as Gender);
  // }

  return (
    <ThemeProvider theme={theme}>
      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("form submiited", e);
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          sx={{
            width: 400, // fixed width in px
            margin: "0 auto", // center horizontally
            display: "flex",
            flexDirection: "column",
            gap: 2, // spacing between children
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <FormControl>
            <FormLabel>Gender</FormLabel>

            <RadioGroup
              value={gender}
              onChange={(e) => {
                const value = e.target.value;

                if (isGender(value)) {
                  setGender(value);
                }
              }}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>

          <Button
            variant="contained"
            type="submit"
            onClick={(e) => {
              console.log(e);
            }}
          >
            Submit
          </Button>
        </Box>
      </form> */}

      <Container
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack gap={2}>
          <Typography variant="h5">Hello there</Typography>
          <p>Hello there</p>
          <Slider
            disabled={loading}
            sx={{
              width: 100,
              color: "success.main",
              // ":hover": {
              //   backgroundColor: "beige",
              // },
              // "& .MuiSlider-thumb": {
              //   ":hover": {
              //     backgroundColor: "red",
              //   },
              //   backgroundColor: "powderblue",
              // },

              // "&.Mui-disabled": {
              //   ".MuiSlider-thumb": {
              //     backgroundColor: "error.main",
              //   },
              // },

              "&.Mui-disabled .MuiSlider-rail": {
                backgroundColor: "error.main",
              },
            }}
          />
          <CustomSlider />
          <CustomSliderWtihError error={true} />
          <Button variant="contained">Helos</Button>
          <Button variant="outlined" color="secondary">
            Secondary
          </Button>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
