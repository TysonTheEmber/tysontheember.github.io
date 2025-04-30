/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import DefaultCounterCard from "examples/Cards/CounterCards/DefaultCounterCard";

function Counters() {
  return (
    <MKBox component="section" py={3}>
      <Container>
        <Grid container item xs={12} lg={9} sx={{ mx: "auto" }}>
          <Grid item xs={12} md={4}>
            <DefaultCounterCard
              count={12}
              suffix="k+"
              title="Downloads"
              description="Placeholder Text"
            />
          </Grid>
          <Grid item xs={12} md={4} display="flex">
            <Divider orientation="vertical" sx={{ display: { xs: "none", md: "block" }, mx: 5 }} />
            <DefaultCounterCard
              count={1500}
              suffix="+"
              title="Placeholder Text"
              description="Placeholder Text"
            />
            <Divider orientation="vertical" sx={{ display: { xs: "none", md: "block" }, ml: 5 }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <DefaultCounterCard count={4} title="Projects" description="Placeholder Text" />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Counters;
