import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Box,
} from "@mui/material";
import axios from "axios";

const BannerFormDialog = ({ open, onClose, initialData, bannerCount }) => {
  const isEdit = Boolean(initialData);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    isActive: true,
    sortOrder: bannerCount + 1,
    imgFile: null,
    imagePreviewUrl: "",
  });

  useEffect(() => {
    if (isEdit) {
      setFormData({
        title: initialData.title || "",
        desc: initialData.desc || "",
        isActive: initialData.isActive ?? true,
        sortOrder: initialData.sortOrder ?? bannerCount + 1,
        imgFile: null,
        imagePreviewUrl: initialData.image
          ? `http://localhost:3000${initialData.image}`
          : "",
      });
    } else {
      setFormData({
        title: "",
        desc: "",
        isActive: true,
        sortOrder: bannerCount + 1,
        imgFile: null,
        imagePreviewUrl: "",
      });
    }
  }, [initialData, bannerCount, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "isActive") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "imgFile") {
      const file = e.target.files[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          imgFile: file,
          imagePreviewUrl: URL.createObjectURL(file),
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      alert("Title is required.");
      return;
    }
    if (!isEdit && !formData.imgFile) {
      alert("Image is required.");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      if (formData.desc) data.append("desc", formData.desc);
      data.append("isActive", formData.isActive);
      data.append("sortOrder", formData.sortOrder);

      if (formData.imgFile) {
        data.append("image", formData.imgFile); // **Important: field name "image" to match backend multer**
      }

      const API_URL = isEdit
        ? `http://localhost:3000/v1/api/banner/${initialData._id}`
        : "http://localhost:3000/v1/api/banner";

      const method = isEdit ? "put" : "post";

      await axios[method](API_URL, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onClose();
    } catch (error) {
      console.error("Error saving banner:", error);
      alert("Failed to save banner. Please check the console.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? "Edit Banner" : "Add New Banner"}</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        <Box mt={2}>
          <input
            accept="image/*"
            type="file"
            name="imgFile"
            id="banner-image-upload"
            style={{ display: "none" }}
            onChange={handleChange}
          />
          <label htmlFor="banner-image-upload">
            <Button variant="contained" component="span">
              {isEdit ? "Change Image" : "Upload Image"}
            </Button>
          </label>
          {formData.imagePreviewUrl && (
            <Box
              component="img"
              src={formData.imagePreviewUrl}
              alt="Preview"
              sx={{ mt: 2, maxWidth: "100%", maxHeight: 200 }}
            />
          )}
        </Box>
        <FormControlLabel
          control={
            <Switch
              checked={formData.isActive}
              onChange={handleChange}
              name="isActive"
              color="primary"
            />
          }
          label="Active"
          sx={{ mt: 2 }}
        />
        <TextField
          label="Sort Order"
          name="sortOrder"
          type="number"
          value={formData.sortOrder}
          onChange={handleChange}
          fullWidth
          margin="normal"
          inputProps={{ min: 0 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {isEdit ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BannerFormDialog;
