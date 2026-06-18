import Typography from "../common/Typography";
import MessageForm from "../forms/MessageForm";
import ReplyList from "./ReplyList";
import { getAvatarColor } from "../../utils/avatarColor";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MuiTypography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

function MessageCard({ message, onLike, onReply }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>

        {/* Sender */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Avatar sx={{
            bgcolor: getAvatarColor(message.from),
            width: 52,
            height: 52,
            fontSize: "1.4rem",
            fontWeight: 700,
          }}>
            {message.from?.charAt(0).toUpperCase()}
          </Avatar>

          <div>
            <MuiTypography variant="h6">
              {message.from}
            </MuiTypography>

            <MuiTypography
              variant="body2"
              color="text.secondary"
            >
              To: {message.to}
            </MuiTypography>
          </div>
        </Stack>

        {/* Message Text */}
        <Typography variant="p">
          {message.text}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Like Button */}
        <button onClick={() => onLike(message.id)}>
          👍 {message.likes}
        </button>

        <Divider sx={{ my: 2 }} />

        {/* Reply Form */}
        <MessageForm
          isReply={true}
          buttonText="Reply"
          onSubmit={(name, text) =>
            onReply(message.id, name, text)
          }
        />

        {/* Replies */}
        <ReplyList replies={message.replies} />

      </CardContent>
    </Card>
  );
}

export default MessageCard;