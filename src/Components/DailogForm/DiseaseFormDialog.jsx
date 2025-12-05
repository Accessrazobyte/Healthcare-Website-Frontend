import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Stack,
  Avatar,
  DialogActions,
  FormControlLabel,
  Switch,
  Typography,
  Alert,
  CircularProgress,
  Autocomplete,
  IconButton,
  Grid
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

const BASE_URL = "http://localhost:3000/v1/api";

// Departments Hook
const useDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${BASE_URL}/get-departments`);
      
      if (response.data && response.data.departments) {
        setDepartments(response.data.departments);
      } else if (response.data && Array.isArray(response.data)) {
        setDepartments(response.data);
      } else {
        setDepartments([]);
      }
    } catch (err) {
      console.error("Error fetching departments:", err);
      setError(err.message);
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return { departments, loading, error, refetch: fetchDepartments };
};

// Styled Components
const ImageBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: 8,
  padding: 0,
  overflow: "hidden",
  width: "100%",
  aspectRatio: "1 / 1",
  position: "relative",
  maxWidth: 150,
  cursor: "pointer",
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}));

const FullCoverAvatar = styled(Avatar)(() => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
}));

export default function DiseaseFormDialog({ open, handleClose, initialData, onSuccess }) {
  const imageInputRef = useRef(null);
  const { departments, loading: departmentsLoading, error: departmentsError } = useDepartments();
  
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    description: "",
    sortOrder: "1",
    showHome: false,
    status: "Active",
    iconimg: null,
    isActive: true
  });

  // Reset form when dialog opens/closes or initialData changes
  useEffect(() => {
    if (open) {
      if (initialData) {
        setFormData({
          name: initialData.name || "",
          department: initialData.department || "",
          description: initialData.description || "",
          sortOrder: initialData.sortOrder?.toString() || "1",
          showHome: initialData.showHome || false,
          status: initialData.status || "Active",
          iconimg: null,
          isActive: initialData.isActive !== undefined ? initialData.isActive : true
        });
        
        if (initialData.iconimg) {
          setImagePreview(`${BASE_URL}/uploads/diseases/${initialData.iconimg}`);
        } else {
          setImagePreview(null);
        }
      } else {
        // Reset form for new disease
        setFormData({
          name: "",
          department: "",
          description: "",
          sortOrder: "1",
          showHome: false,
          status: "Active",
          iconimg: null,
          isActive: true
        });
        setImagePreview(null);
      }
      setError("");
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value, files, checked, type } = e.target;
    setError("");
    
    if (name === "iconimg" && files && files[0]) {
      const file = files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError("Please select a valid image file");
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
      
      setFormData((prev) => ({
        ...prev,
        iconimg: file
      }));
      
      // Create preview for new image
      setImagePreview(URL.createObjectURL(file));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle department selection from Autocomplete
  const handleDepartmentChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      department: newValue || ""
    }));
  };

  const triggerInput = () => {
    if (imageInputRef.current) imageInputRef.current.click();
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, iconimg: null }));
    setImagePreview(null);
    if (imageInputRef.current) imageInputRef.current.value = null;
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Disease name is required");
      return false;
    }
    if (!formData.department.trim()) {
      setError("Please select a department");
      return false;
    }
    if (formData.sortOrder && (isNaN(formData.sortOrder) || formData.sortOrder < 1)) {
      setError("Sort order must be a positive number");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const data = new FormData();
    data.append("name", formData.name.trim());
    data.append("department", formData.department.trim());
    data.append("description", formData.description.trim());
    data.append("sortOrder", formData.sortOrder);
    data.append("showHome", formData.showHome.toString());
    data.append("status", formData.status);
    data.append("isActive", formData.isActive.toString());

    if (formData.iconimg) {
      data.append("iconimg", formData.iconimg);
    }

    try {
      setLoading(true);
      let res;
      
      if (initialData) {
        // Update existing disease
        res = await axios.put(`${BASE_URL}/diseases/${initialData._id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Create new disease
        res = await axios.post(`${BASE_URL}/diseases`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (onSuccess) onSuccess();
      handleClose();
    } catch (error) {
      console.error("API Error:", error);
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setError("");
    handleClose();
  };

  // Get unique department names for Autocomplete
  const departmentOptions = departments
    .map(dept => dept.name || dept.departmentName || dept.title)
    .filter(Boolean)
    .filter((name, index, array) => array.indexOf(name) === index);

  return (
    <Dialog 
      open={open} 
      onClose={handleCloseDialog} 
      maxWidth="sm" 
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            {initialData ? "Edit Disease" : "Add New Disease"}
          </Typography>
          <IconButton onClick={handleCloseDialog} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        {departmentsError && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Unable to load departments
          </Alert>
        )}
        
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
        >
          <TextField
            required
            name="name"
            label="Disease Name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            error={!!error && !formData.name.trim()}
            helperText={!!error && !formData.name.trim() ? error : ""}
          />

          <FormControl fullWidth required error={!!error && !formData.department.trim()}>
            <Autocomplete
              freeSolo
              options={departmentOptions}
              value={formData.department}
              onChange={handleDepartmentChange}
              onInputChange={(event, newInputValue) => {
                setFormData(prev => ({
                  ...prev,
                  department: newInputValue
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Department"
                  error={!!error && !formData.department.trim()}
                  helperText={!!error && !formData.department.trim() ? error : "Select or type department name"}
                />
              )}
              loading={departmentsLoading}
            />
          </FormControl>

          <Box>
            <Typography variant="body2" gutterBottom color="textSecondary">
              Disease Image (Max: 5MB)
            </Typography>
            <ImageBox onClick={triggerInput}>
              <FullCoverAvatar
                variant="square"
                src={
                  imagePreview || 
                  (initialData?.iconimg ? `${BASE_URL}/uploads/diseases/${initialData.iconimg}` : "/placeholder-image.png")
                }
                onError={(e) => {
                  e.target.src = "/placeholder-image.png";
                }}
              />
              <input
                type="file"
                accept="image/*"
                hidden
                name="iconimg"
                ref={imageInputRef}
                onChange={handleChange}
              />
            </ImageBox>

            <Stack direction="row" spacing={1} mt={1}>
              <Button 
                size="small" 
                variant="outlined" 
                startIcon={<CloudUploadIcon />}
                onClick={triggerInput}
              >
                {imagePreview || initialData?.iconimg ? 'Change Image' : 'Upload Image'}
              </Button>
              {(imagePreview || initialData?.iconimg) && (
                <Button 
                  size="small" 
                  variant="outlined" 
                  color="error" 
                  startIcon={<DeleteIcon />}
                  onClick={handleRemoveImage}
                >
                  Remove
                </Button>
              )}
            </Stack>
          </Box>

          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            placeholder="Enter disease description..."
          />

          <TextField
            name="sortOrder"
            label="Sort Order"
            type="number"
            value={formData.sortOrder}
            onChange={handleChange}
            fullWidth
            inputProps={{ min: 1, max: 1000 }}
          />

          <FormControlLabel
            control={
              <Switch
                name="showHome"
                checked={formData.showHome}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Show on Homepage"
          />

          <FormControlLabel
            control={
              <Switch
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Active Disease"
          />

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button 
          onClick={handleCloseDialog} 
          color="secondary" 
          variant="outlined" 
          disabled={loading}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading || departmentsLoading}
          startIcon={loading ? <CircularProgress size={16} /> : null}
        >
          {loading ? "Processing..." : initialData ? "Update Disease" : "Create Disease"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}