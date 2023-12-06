import {
  Box,
  Button,
  CircularProgress,
  Pagination,
  Paper,
  Stack,
  Table,
  TextField,
  Grid,
} from "@mui/material";
import useAction from "./detail.hooks";
import { IBooks } from "../books.types";

import CommonPage from "../../../components/common-page/common-page";
import { Link, useNavigate } from "react-router-dom";
import { parseISO, format } from "date-fns";
import { TitleWrapper } from "./detail.styled";

export default function Detail() {
  const navigate = useNavigate();
  const { book, loading, meta, handleEdit, handleRemove } = useAction();

  const renderLoading = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem 0",
        }}
      >
        <CircularProgress />
      </div>
    );
  };
  const renderContent = () => {
    if (loading) {
      return renderLoading();
    }
    console.log(book);

    return (
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem 0",
        }}
      >
        <Box
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              justifyContent: "start",
              alignItems: "center",
              paddingRight: "112px",
              paddingLeft: "20px",
            }}
          >
            <TitleWrapper>
              <h6>Title</h6>
              <p>{book.title}</p>
            </TitleWrapper>
            <TitleWrapper>
              <h6>ISBN</h6>
              <p>{book.isbn}</p>
            </TitleWrapper>
            <TitleWrapper>
              <h6>Genre</h6>
              <p>{book.genre}</p>
            </TitleWrapper>
            <TitleWrapper>
              <h6>Copies Available</h6>
              <p>{book.copies_available}</p>
            </TitleWrapper>
          </div>

          <div
            style={{
              justifyContent: "start",
              alignItems: "center",
              paddingRight: "20px",
            }}
          >
            <TitleWrapper>
              <h6>Author</h6>
              <p>{book.author}</p>
            </TitleWrapper>
            <TitleWrapper>
              <h6>Published Year</h6>
              <p>{book.published_year}</p>
            </TitleWrapper>
            <TitleWrapper>
              <h6>Total Copies</h6>
              <p>{book.total_copies}</p>
            </TitleWrapper>
          </div>
        </Box>
        <Box style={{ width: "50%" }}>
          <img
            src={book.cover?.secure_url}
            alt="preview"
            style={{ width: "100%", objectFit: "cover" }}
          />
        </Box>
      </Box>
    );
  };

  return (
    <CommonPage withBack title="Book Detail">
      <TitleWrapper>
        <h6>Detail Information</h6>
      </TitleWrapper>
      <div>{renderContent()}</div>
    </CommonPage>
  );
}
