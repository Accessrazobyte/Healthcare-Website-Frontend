import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormControlLabel,
  Switch,
  Chip,
  OutlinedInput,
  Box,
  Typography,
  Autocomplete,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";

// Custom Hooks Import
import useCategories from "../Hooks/useCategories";
import useKeyFeatures from "../Hooks/useKeyFeatures";
import useDepartments from "../Hooks/useDepartments";
import useDiseases from "../Hooks/useDiseases";
import useCertificates from "../Hooks/useCertificates";
import useLabs from "../Hooks/useLabs";

const BASE_URL = "http://localhost:3000/v1/api";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ScrollableMenuProps = {
  PaperProps: {
    style: {
      maxHeight: 200,
      width: 250,
      overflow: 'auto',
    },
  },
};

function ItemListingDialog({ open, handleClose, initialData, onSuccess }) {
  // Custom Hooks Use
  const { categories, loading: categoriesLoading } = useCategories();
  const { keyFeatures, loading: featuresLoading } = useKeyFeatures();
  const { departments, loading: departmentsLoading } = useDepartments();
  const { diseases, loading: diseasesLoading } = useDiseases();
  const { certificates, loading: certificatesLoading } = useCertificates();
  const { labs, loading: labsLoading, getActiveLabs } = useLabs();

  const [formData, setFormData] = useState({
    name: "",
    itemType: "Package",
    testCount: 1,
    keyFeatures: [],
    department: [],
    diseases: "",
    category: "",
    reportingTime: "",
    specimen: "",
    fromAge: 0,
    toAge: 0,
    gender: "Both",
    showIn: "",
    showPopularPackage: "No",
    showInHome: false,
    showHomeBanner: false,
    status: true,
    
    // Pricing & Location Fields
    city: "",
    price: "",
    mrp: "",
    schedulePrice: "",
    startDate: "",
    endDate: "",
    certificate: "",
    lab: "",
    
    // Meta Fields
    metaTitle: "",
    metaKeywords: "",
    metaDescription: "",
    metaSchema: "",
  });

  const [iconImg, setIconImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get active labs for dropdown
  const activeLabs = getActiveLabs();

  // Function to handle chip delete
  const handleChipDelete = (field, valueToDelete) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter(item => item !== valueToDelete)
    }));
  };

  // Prefill form when editing
  useEffect(() => {
    if (initialData) {
      console.log("Editing product:", initialData);
      setFormData({
        name: initialData.name || "",
        itemType: initialData.itemType || "Package",
        testCount: initialData.testCount || 1,
        keyFeatures: initialData.keyFeatures?.map(f => f._id || f) || [],
        department: initialData.department?.map(d => d._id || d) || [],
        diseases: initialData.diseases?._id || initialData.diseases || "",
        category: initialData.category?._id || initialData.category || "",
        reportingTime: initialData.reportingTime || "",
        specimen: initialData.specimen || "",
        fromAge: initialData.fromAge || 0,
        toAge: initialData.toAge || 0,
        gender: initialData.gender || "Both",
        showIn: initialData.showIn || "",
        showPopularPackage: initialData.showPopularPackage || "No",
        showInHome: initialData.showInHome || false,
        showHomeBanner: initialData.showHomeBanner || false,
        status: initialData.status ?? true,
        
        // Pricing & Location Fields
        city: initialData.city || "",
        price: initialData.price || "",
        mrp: initialData.mrp || "",
        schedulePrice: initialData.schedulePrice || "",
        startDate: initialData.startDate || "",
        endDate: initialData.endDate || "",
        certificate: initialData.certificate?._id || initialData.certificate || "",
        lab: initialData.lab?._id || initialData.lab || "",
        
        // Meta Fields
        metaTitle: initialData.metaTitle || "",
        metaKeywords: initialData.metaKeywords || "",
        metaDescription: initialData.metaDescription || "",
        metaSchema: initialData.metaSchema || "",
      });
      
      // Set image preview if exists
      if (initialData.iconImg) {
        setPreviewImg(`${BASE_URL}/uploads/${initialData.iconImg}`);
      } else {
        setPreviewImg(null);
      }
      setIconImg(null);
    } else {
      // Reset form when creating new
      resetForm();
    }
  }, [initialData, open]);

  const resetForm = () => {
    setFormData({
      name: "",
      itemType: "Package",
      testCount: 1,
      keyFeatures: [],
      department: [],
      diseases: "",
      category: "",
      reportingTime: "",
      specimen: "",
      fromAge: 0,
      toAge: 0,
      gender: "Both",
      showIn: "",
      showPopularPackage: "No",
      showInHome: false,
      showHomeBanner: false,
      status: true,
      city: "",
      price: "",
      mrp: "",
      schedulePrice: "",
      startDate: "",
      endDate: "",
      certificate: "",
      lab: "",
      metaTitle: "",
      metaKeywords: "",
      metaDescription: "",
      metaSchema: "",
    });
    setPreviewImg(null);
    setIconImg(null);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMultiSelectChange = (name, values) => {
    setFormData((prev) => ({ ...prev, [name]: values }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setIconImg(file);
    if (file) {
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Item name is required");
      return false;
    }
    if (!formData.city.trim()) {
      setError("City is required");
      return false;
    }
    if (!formData.price || formData.price <= 0) {
      setError("Valid price is required");
      return false;
    }
    if (!formData.metaTitle.trim()) {
      setError("Meta title is required");
      return false;
    }
    if (!formData.metaKeywords.trim()) {
      setError("Meta keywords are required");
      return false;
    }
    if (!formData.metaDescription.trim()) {
      setError("Meta description is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      setError("");
      
      if (!validateForm()) {
        return;
      }

      setLoading(true);
      
      const submitData = new FormData();
      
      // Append all form data
      Object.keys(formData).forEach(key => {
        if (Array.isArray(formData[key])) {
          // For arrays, send as JSON string
          submitData.append(key, JSON.stringify(formData[key]));
        } else if (formData[key] !== null && formData[key] !== undefined) {
          submitData.append(key, formData[key]);
        }
      });
      
      if (iconImg) {
        submitData.append("iconImg", iconImg);
      }

      let response;
      if (initialData) {
        // UPDATE request
        response = await axios.put(
          `${BASE_URL}/items/${initialData._id}`,
          submitData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        // CREATE request
        response = await axios.post(
          `${BASE_URL}/post_product`,
          submitData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }
      console.log("Success:", response.data);
      
      if (onSuccess) {
        onSuccess();
      }
      
      handleClose();
      resetForm();
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    resetForm();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} fullWidth maxWidth="md" scroll="paper">
      <DialogTitle>
        <Typography variant="h6" component="div">
          {initialData ? "Edit Item" : "Create New Item"}
        </Typography>
      </DialogTitle>
      
      <DialogContent dividers>
        <Stack spacing={3} mt={1}>
          {/* Error Alert */}
          {error && (
            <Alert severity="error" onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          {/* Name */}
          <TextField
            label="Item Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            error={!formData.name.trim()}
            helperText={!formData.name.trim() ? "Item name is required" : ""}
          />

          {/* Item Type & Test Count */}
          <Stack direction="row" spacing={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Item Type</InputLabel>
              <Select
                name="itemType"
                value={formData.itemType}
                onChange={handleChange}
                label="Item Type"
              >
                <MenuItem value="Package">Package</MenuItem>
                <MenuItem value="Test">Test</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Test Count"
              name="testCount"
              type="number"
              value={formData.testCount}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              inputProps={{ min: 1 }}
            />
          </Stack>

          {/* Key Features - MultiSelect with Chips */}
          <FormControl fullWidth variant="outlined">
            <InputLabel>Key Features</InputLabel>
            <Select
              multiple
              value={formData.keyFeatures}
              onChange={(e) => handleMultiSelectChange("keyFeatures", e.target.value)}
              input={<OutlinedInput label="Key Features" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const feature = keyFeatures.find(f => f._id === value);
                    return (
                      <Chip 
                        key={value} 
                        label={feature ? feature.name : value} 
                        size="small"
                        onDelete={() => handleChipDelete("keyFeatures", value)}
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    );
                  })}
                </Box>
              )}
              MenuProps={MenuProps}
              disabled={featuresLoading}
            >
              {featuresLoading ? (
                <MenuItem disabled>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CircularProgress size={20} />
                    <Typography>Loading key features...</Typography>
                  </Stack>
                </MenuItem>
              ) : keyFeatures.length === 0 ? (
                <MenuItem disabled>No key features available</MenuItem>
              ) : (
                keyFeatures.map((feature) => (
                  <MenuItem key={feature._id} value={feature._id}>
                    <Typography noWrap>{feature.name}</Typography>
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          {/* Department - MultiSelect with Chips */}
          <FormControl fullWidth variant="outlined">
            <InputLabel>Department</InputLabel>
            <Select
              multiple
              value={formData.department}
              onChange={(e) => handleMultiSelectChange("department", e.target.value)}
              input={<OutlinedInput label="Department" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const dept = departments.find(d => d._id === value);
                    return (
                      <Chip 
                        key={value} 
                        label={dept ? dept.name : value} 
                        size="small"
                        onDelete={() => handleChipDelete("department", value)}
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    );
                  })}
                </Box>
              )}
              MenuProps={MenuProps}
              disabled={departmentsLoading}
            >
              {departmentsLoading ? (
                <MenuItem disabled>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CircularProgress size={20} />
                    <Typography>Loading departments...</Typography>
                  </Stack>
                </MenuItem>
              ) : departments.length === 0 ? (
                <MenuItem disabled>No departments available</MenuItem>
              ) : (
                departments.map((dept) => (
                  <MenuItem key={dept._id} value={dept._id}>
                    <Typography noWrap>{dept.name}</Typography>
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          {/* Diseases - Autocomplete */}
          <FormControl fullWidth>
            <Autocomplete
              options={diseases}
              getOptionLabel={(option) => option.name || ""}
              value={diseases.find(d => d._id === formData.diseases) || null}
              onChange={(event, newValue) => {
                setFormData(prev => ({
                  ...prev,
                  diseases: newValue ? newValue._id : ""
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Diseases"
                  variant="outlined"
                  fullWidth
                  placeholder="Select disease"
                />
              )}
              disabled={diseasesLoading}
              noOptionsText="No diseases found"
            />
          </FormControl>

          {/* Category - Dropdown */}
          <FormControl fullWidth variant="outlined">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              label="Category"
              disabled={categoriesLoading}
              MenuProps={ScrollableMenuProps}
            >
              <MenuItem value="">
                <em>Select Category</em>
              </MenuItem>
              {categoriesLoading ? (
                <MenuItem disabled>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CircularProgress size={20} />
                    <Typography>Loading categories...</Typography>
                  </Stack>
                </MenuItem>
              ) : categories.length === 0 ? (
                <MenuItem disabled>No categories available</MenuItem>
              ) : (
                categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    <Typography noWrap title={category.name}>
                      {category.name}
                    </Typography>
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          {/* Reporting Time */}
          <TextField
            label="Reporting Time"
            name="reportingTime"
            value={formData.reportingTime}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            placeholder="e.g., 24 hours, 2 days"
          />

          {/* Specimen */}
          <TextField
            label="Specimen"
            name="specimen"
            multiline
            rows={3}
            value={formData.specimen}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            placeholder="Type of specimen required..."
          />

          {/* Image Upload */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Item Image
            </Typography>
            <Button 
              component="label" 
              variant="outlined" 
              fullWidth
              sx={{ mb: 1 }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            {previewImg && (
              <Box mt={1} textAlign="center">
                <img
                  src={previewImg}
                  alt="Preview"
                  style={{ 
                    width: 120, 
                    height: 120, 
                    objectFit: "cover", 
                    borderRadius: 8,
                    border: '1px solid #e0e0e0'
                  }}
                />
                <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                  Preview
                </Typography>
              </Box>
            )}
          </Box>

          {/* Age & Gender */}
          <Stack direction="row" spacing={2}>
            <TextField
              label="From Age"
              type="number"
              name="fromAge"
              value={formData.fromAge}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              inputProps={{ min: 0, max: 100 }}
            />
            <TextField
              label="To Age"
              type="number"
              name="toAge"
              value={formData.toAge}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              inputProps={{ min: 0, max: 100 }}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                label="Gender"
              >
                <MenuItem value="Both">Both</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {/* Show In */}
          <TextField
            label="Show In"
            name="showIn"
            value={formData.showIn}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            placeholder="Where to display this item"
          />

          {/* Show Popular Package */}
          <FormControl fullWidth variant="outlined">
            <InputLabel>Show Popular Package?</InputLabel>
            <Select
              name="showPopularPackage"
              value={formData.showPopularPackage}
              onChange={handleChange}
              label="Show Popular Package?"
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>

          {/* Pricing & Location Section */}
          <Divider>
            <Typography variant="subtitle2" color="primary">
              Pricing & Location
            </Typography>
          </Divider>

          {/* City - Required */}
          <TextField
            label="City *"
            name="city"
            value={formData.city}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            placeholder="Enter city name"
            error={!formData.city.trim()}
            helperText={!formData.city.trim() ? "City is required" : ""}
          />

          {/* Price Section */}
          <Stack direction="row" spacing={2}>
            <TextField
              label="Price *"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              inputProps={{ min: 0, step: "0.01" }}
              error={!formData.price || formData.price <= 0}
              helperText={!formData.price || formData.price <= 0 ? "Valid price is required" : ""}
            />
            <TextField
              label="MRP"
              name="mrp"
              type="number"
              value={formData.mrp}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              inputProps={{ min: 0, step: "0.01" }}
            />
            <TextField
              label="Schedule Price"
              name="schedulePrice"
              type="number"
              value={formData.schedulePrice}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              inputProps={{ min: 0, step: "0.01" }}
            />
          </Stack>

          {/* Date Section */}
          <Stack direction="row" spacing={2}>
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Stack>

          {/* Certificate & Lab Section */}
          <Divider>
            <Typography variant="subtitle2" color="primary">
              Certificate & Lab
            </Typography>
          </Divider>

          {/* Certificate Dropdown */}
          <FormControl fullWidth variant="outlined">
            <InputLabel>Choose Certificate</InputLabel>
            <Select
              name="certificate"
              value={formData.certificate}
              onChange={handleChange}
              label="Choose Certificate"
              disabled={certificatesLoading}
              MenuProps={ScrollableMenuProps}
            >
              <MenuItem value="">
                <em>Select Certificate</em>
              </MenuItem>
              {certificatesLoading ? (
                <MenuItem disabled>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CircularProgress size={20} />
                    <Typography>Loading certificates...</Typography>
                  </Stack>
                </MenuItem>
              ) : certificates.length === 0 ? (
                <MenuItem disabled>No certificates available</MenuItem>
              ) : (
                certificates.map((certificate) => (
                  <MenuItem key={certificate._id} value={certificate._id}>
                    <Box>
                      <Typography noWrap title={certificate.name}>
                        {certificate.name}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          {/* Lab Dropdown */}
          <FormControl fullWidth variant="outlined">
            <InputLabel>Choose Lab</InputLabel>
            <Select
              name="lab"
              value={formData.lab}
              onChange={handleChange}
              label="Choose Lab"
              disabled={labsLoading}
              MenuProps={ScrollableMenuProps}
            >
              <MenuItem value="">
                <em>Select Lab</em>
              </MenuItem>
              {labsLoading ? (
                <MenuItem disabled>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CircularProgress size={20} />
                    <Typography>Loading labs...</Typography>
                  </Stack>
                </MenuItem>
              ) : activeLabs.length === 0 ? (
                <MenuItem disabled>No active labs available</MenuItem>
              ) : (
                activeLabs.map((lab) => (
                  <MenuItem key={lab._id} value={lab._id}>
                    <Box>
                      <Typography noWrap title={lab.name}>
                        {lab.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary" display="block">
                        {lab.city} • {lab.contactNumber}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          {/* Meta Description Section */}
          <Divider>
            <Typography variant="subtitle2" color="primary">
              META DESCRIPTION
            </Typography>
          </Divider>

          <TextField
            label="Title *"
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            placeholder="Meta title for SEO"
            error={!formData.metaTitle.trim()}
            helperText={!formData.metaTitle.trim() ? "Meta title is required" : ""}
          />

          <TextField
            label="Keywords *"
            name="metaKeywords"
            value={formData.metaKeywords}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            placeholder="Comma separated keywords"
            error={!formData.metaKeywords.trim()}
            helperText={!formData.metaKeywords.trim() ? "Meta keywords are required" : ""}
          />

          <TextField
            label="Description *"
            name="metaDescription"
            multiline
            rows={3}
            value={formData.metaDescription}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            placeholder="Meta description for SEO"
            error={!formData.metaDescription.trim()}
            helperText={!formData.metaDescription.trim() ? "Meta description is required" : ""}
          />

          <TextField
            label="Meta Schema"
            name="metaSchema"
            multiline
            rows={3}
            value={formData.metaSchema}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            placeholder="JSON-LD schema or other meta schema"
          />

          <Typography variant="caption" color="textSecondary">
            Note: Write city name like (CITY) in meta details. It will change with current city. *
          </Typography>

          {/* Switches */}
          <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Visibility Settings
            </Typography>
            <Stack spacing={1}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.showInHome}
                    onChange={handleChange}
                    name="showInHome"
                  />
                }
                label="Show in Home"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.showHomeBanner}
                    onChange={handleChange}
                    name="showHomeBanner"
                  />
                }
                label="Show as Home Banner"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.status}
                    onChange={handleChange}
                    name="status"
                  />
                }
                label="Active Status"
              />
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={handleDialogClose} 
          disabled={loading}
          variant="outlined"
          color="inherit"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading}
          sx={{ minWidth: 100 }}
        >
          {loading ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <CircularProgress size={20} color="inherit" />
              <Typography>Saving...</Typography>
            </Stack>
          ) : initialData ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ItemListingDialog;