import { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Star, Window } from "@mui/icons-material";

import "./starAnimation.css";
import { Game } from ".";
import { colors } from "../../global/colors";

// resultado avaliar (strela) ou favoritar
type actionResponse = "SUCCES" | "ERROR";
type GameCardProps = {
  cardData: Game;
  onStar: (stars: number) => Promise<actionResponse>;
  onFavorite: (isFav: boolean) => Promise<actionResponse>;
};

const GameCard: React.FC<GameCardProps> = ({
  cardData,
  onStar,
  onFavorite,
}) => {
  const [stars, setStars] = useState(cardData.stars);
  const [isFavorite, setIsFavorite] = useState(cardData.isFavorite);
  const [isStarSuccess, setIsStarSuccess] = useState(false);

  async function handleStar(stars: number) {
    const result: any = await onStar(stars);
    if (result === "SUCCES") {
      setStars(stars);
      setIsStarSuccess(!isStarSuccess);
    }
  }

  async function handleFavorite() {
    const result: any = await onFavorite(!isFavorite);

    if (result === "SUCCES") {
      setIsFavorite(!isFavorite);
    }
  }

  return (
    <Card
      sx={{
        minWidth: "60%",
        maxWidth: "100%",

        borderRadius: 3,
        "&:hover": {
          transform: "scale(1.1)",
          transition: "transform 0.2s ease-in-out",
        },
      }}
    >
      <CardMedia
        sx={{ height: 240, width: "100%" }}
        image={cardData.thumbnail}
        title={cardData.title}
      />
      <CardContent
        style={{
          paddingLeft: 16,
          paddingTop: 8,
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Window sx={{ color: "#888889" }}></Window>
          <Button
            color="info"
            variant="contained"
            size="small"
            style={{
              textTransform: "none",
              float: "right",
              fontSize: 11,
              fontWeight: "bold",
              color: "#9ae7b4",
              backgroundColor: "#354039",
            }}
            disabled={true}
          >
            {cardData.genre}
          </Button>
        </div>

        <Typography variant="h5" fontWeight="bold">
          {cardData.title}
        </Typography>
      </CardContent>
      <CardActions sx={{ paddingTop: 0, paddingBottom: 1, paddingRight: 2 }}>
        <IconButton onClick={() => handleFavorite()} aria-label="settings">
          {!isFavorite ? (
            <FavoriteBorderIcon
              style={{
                width: 32,
                height: 32,
                color: colors.white,
              }}
            />
          ) : (
            <FavoriteIcon
              style={{
                width: 32,
                height: 32,
                color: colors.red,
              }}
            />
          )}
        </IconButton>
        <div
          style={{
            display: "flex",
            borderRadius: 8,

            marginLeft: "auto",
          }}
        >
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              onClick={() => handleStar(index + 1)}
              style={{ color: stars > index ? colors.gold : colors.white }}
              className={`star ${stars > index ? "selected" : ""}`}
            >
              <Star
                style={{
                  width: 21,
                  height: 21,
                }}
              />
            </div>
          ))}
        </div>
      </CardActions>
    </Card>
  );
};

export default GameCard;
