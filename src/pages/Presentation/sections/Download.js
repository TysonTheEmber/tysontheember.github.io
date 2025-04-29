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
import Tooltip from "@mui/material/Tooltip";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Images
import bgImage from "assets/images/shapes/waves-white.svg";

function Download() {
  return (
    <MKBox component="section" py={{ xs: 0, sm: 12 }}>
      <MKBox
        variant="gradient"
        bgColor="dark"
        position="relative"
        borderRadius="xl"
        sx={{ overflow: "hidden" }}
      >
        <MKBox
          component="img"
          src={bgImage}
          alt="pattern-lines"
          position="absolute"
          top={0}
          left={0}
          width="100%"
          zIndex={1}
          opacity={0.2}
        />
        <Container sx={{ position: "relative", zIndex: 2, py: 12 }}>
          <Grid container item xs={12} md={7} justifyContent="center" mx="auto" textAlign="center">
            <MKTypography variant="h3" color="white">
              Do you love this awesome modpack?
            </MKTypography>
            <MKTypography variant="body2" color="white" mb={6}>
              Cause if your interested, you can download now and experience it yourself! Have fun exploring a new world!
            </MKTypography>
            <MKButton
              variant="gradient"
              color="info"
              size="large"
              component="a"
              href=""
              sx={{ mb: 2 }}
            >
              Download Now
            </MKButton>
          </Grid>
        </Container>
      </MKBox>
      <Container>
        <Grid container item xs={6} mx="auto">
          <MKBox textAlign="center">
            <MKTypography variant="h3" mt={6} mb={3}>
              Mods included
            </MKTypography>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={4} lg={2}>
                <Tooltip title="Ice and Fire">
                  <MKBox
                    component="a"
                    href=""
                    target="_blank"
                  >
                    <MKBox
                      component="img"
                      src="https://media.forgecdn.net/avatars/thumbnails/190/975/256/256/636857615673605328.png"
                      width="100%"
                    />
                  </MKBox>
                </Tooltip>
              </Grid>
              <Grid item xs={4} lg={2}>
                <Tooltip title="Tinker's Construct">
                  <MKBox
                    opacity={1}
                    component="a"
                    href="#"
                    target="_blank"
                    onClick={(e) => e.preventDefault()}
                  >
                    <MKBox
                      component="img"
                      src="https://media.forgecdn.net/avatars/thumbnails/488/295/256/256/637792495945179503.png"
                      width="100%"
                    />
                  </MKBox>
                </Tooltip>
              </Grid>
              <Grid item xs={4} lg={2}>
                <Tooltip title="Create v6 with addons">
                  <MKBox
                    opacity={1}
                    component="a"
                    href="#"
                    target="_blank"
                    onClick={(e) => e.preventDefault()}
                  >
                    <MKBox
                      component="img"
                      src="https://media.forgecdn.net/avatars/1065/184/638598725500886388.png"
                      width="100%"
                    />
                  </MKBox>
                </Tooltip>
              </Grid>
              <Grid item xs={4} lg={2}>
                <Tooltip title="Better Combat">
                  <MKBox
                    opacity={1}
                    component="a"
                    href="#"
                    target="_blank"
                    onClick={(e) => e.preventDefault()}
                  >
                    <MKBox
                      component="img"
                      src="https://media.forgecdn.net/avatars/thumbnails/566/413/256/256/637925434672465483.png"
                      width="100%"
                    />
                  </MKBox>
                </Tooltip>
              </Grid>
              <Grid item xs={4} lg={2}>
                <Tooltip title="L_Ender's Cataclysm">
                  <MKBox
                    component="a"
                    href=""
                    target="_blank"
                  >
                    <MKBox
                      component="img"
                      src="https://media.forgecdn.net/avatars/thumbnails/460/870/256/256/637739722679428303.png"
                      width="100%"
                    />
                  </MKBox>
                </Tooltip>
              </Grid>
              <Grid item xs={4} lg={2}>
                <Tooltip title="Iron's Spells and Spellbooks">
                  <MKBox
                    opacity={1}
                    component="a"
                    href="#"
                    target="_blank"
                    onClick={(e) => e.preventDefault()}
                  >
                    <MKBox
                      component="img"
                      src="https://media.forgecdn.net/avatars/thumbnails/871/265/256/256/638288661913483053.png"
                      width="100%"
                    />
                  </MKBox>
                </Tooltip>
              </Grid>
            </Grid>
          </MKBox>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Download;
