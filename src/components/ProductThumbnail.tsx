import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import {
  Info,
  InfoCaption,
  InfoSubtitle,
  InfoTitle,
} from "@mui-treasury/components/info";
import { useGalaxyInfoStyles } from "@mui-treasury/styles/info/galaxy";
import { useCoverCardMediaStyles } from "@mui-treasury/styles/cardMedia/cover";

const useStyles = makeStyles(() => ({
  card: {
    borderRadius: "1rem",
    boxShadow: "none",
    position: "relative",
    minWidth: 200,
    minHeight: 360,
    "&:after": {
      content: '""',
      display: "block",
      position: "absolute",
      width: "100%",
      height: "64%",
      bottom: 0,
      zIndex: 1,
      background: "linear-gradient(to top, #000, rgba(0,0,0,0))",
    },
  },
  content: {
    position: "absolute",
    zIndex: 2,
    bottom: 0,
    width: "100%",
  },
}));

interface Props {
  name: string;
  price: string;
  imgUrl: string;
  onClick: any;
}

export const ProductThumbnail = React.memo(function GalaxyCard({
  name,
  price,
  imgUrl,
  onClick,
}: Props) {
  const mediaStyles = useCoverCardMediaStyles({ bgPosition: "top" });
  const styles = useStyles();
  return (
    <>
      <Card className={styles.card} onClick={onClick}>
        <CardMedia classes={mediaStyles} image={imgUrl} />
        <Box py={3} px={2} className={styles.content}>
          <Info useStyles={useGalaxyInfoStyles}>
            <InfoSubtitle>{price}</InfoSubtitle>
            <InfoTitle>{name}</InfoTitle>
            <InfoCaption>맛있는 고구마...</InfoCaption>
          </Info>
        </Box>
      </Card>
    </>
  );
});
export default ProductThumbnail;
