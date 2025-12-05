import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  Grid,
  Chip,
  Stack,
  Switch,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import JoditEditor from "jodit-react";
import useBlogCategories from "../Hooks/useBlogCategories";

const BlogFormDialog = React.memo(({ open, onClose, onSave, editData }) => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    intro: "",
    category: "",
    sortOrder: "",
    status: "active",
    tags: [],
    description: "",
    metaTitle: "",
    metaDescription: "",
    image: "",
  });

  const [tagInput, setTagInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const editorRef = useRef(null);
  
  // Use your custom hook
  const { 
    categories, 
    loading, 
    error,
    fetchCategories 
  } = useBlogCategories();

  // Stable form update function
  const updateForm = useCallback((updates) => {
    setForm(prev => ({ ...prev, ...updates }));
  }, []);

  // Initialize form only when editData actually changes
  useEffect(() => {
    if (open) {
      if (editData) {
        setForm(editData);
        setImageFile(null);
      } else {
        setForm({
          id: "",
          name: "",
          intro: "",
          category: "",
          sortOrder: "",
          status: "active",
          tags: [],
          description: "",
          metaTitle: "",
          metaDescription: "",
          image: "",
        });
        setImageFile(null);
      }
    }
  }, [open, editData]);

  // Refresh categories when dialog opens - with debounce
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        fetchCategories();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    updateForm({ [name]: value });
  }, [updateForm]);

  const handleImage = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      updateForm({ image: URL.createObjectURL(file) });
    }
  }, [updateForm]);

  const addTag = useCallback(() => {
    if (tagInput.trim()) {
      updateForm(prev => ({ 
        ...prev, 
        tags: [...prev.tags, tagInput.trim()] 
      }));
      setTagInput("");
    }
  }, [tagInput, updateForm]);

  const handleTagInputKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  }, [addTag]);

  const removeTag = useCallback((tag) => {
    updateForm(prev => ({ 
      ...prev, 
      tags: prev.tags.filter((t) => t !== tag) 
    }));
  }, [updateForm]);

  // Stable Jodit editor change handler with debounce
  const handleEditorChange = useCallback((value) => {
    updateForm({ description: value });
  }, [updateForm]);

  const handleSubmit = useCallback(() => {
    if (!form.name.trim()) {
      alert("Please enter blog name");
      return;
    }
    if (!form.category) {
      alert("Please select a category");
      return;
    }
    
    onSave(form, imageFile);
  }, [form, imageFile, onSave]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Jodit editor config - defined with useMemo to prevent re-renders
  const editorConfig = useMemo(() => ({
    height: 300,
    toolbarAdaptive: false,
    readonly: false,
    enableDragAndDropFileToEditor: true,
    uploader: {
      insertImageAsBase64URI: true
    },
    buttons: [
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'ul', 'ol', '|',
      'outdent', 'indent', '|',
      'font', 'fontsize', 'brush', '|',
      'image', 'link', '|',
      'align', '|',
      'undo', 'redo'
    ],
    events: {
      afterInit: function (editor) {
        editorRef.current = editor;
      }
    }
  }), []);

  // Memoized category options to prevent re-renders
  const categoryOptions = useMemo(() => {
    if (loading) {
      return (
        <MenuItem disabled>
          <Box display="flex" alignItems="center">
            <CircularProgress size={16} sx={{ mr: 1 }} />
            Loading categories...
          </Box>
        </MenuItem>
      );
    }
    
    if (categories.length === 0) {
      return <MenuItem disabled>No categories found</MenuItem>;
    }

    return categories.map((cat) => (
      <MenuItem key={cat._id} value={cat._id}>
        {cat.name}
      </MenuItem>
    ));
  }, [categories, loading]);

  // Memoized tags display
  const tagsDisplay = useMemo(() => {
    if (form.tags.length === 0) {
      return (
        <Typography variant="caption" color="textSecondary">
          No tags added yet
        </Typography>
      );
    }

    return form.tags.map((tag, index) => (
      <Chip 
        key={index} 
        label={tag} 
        onDelete={() => removeTag(tag)}
        color="primary"
        variant="outlined"
        size="small"
      />
    ));
  }, [form.tags, removeTag]);

  // Memoized image preview
  const imagePreview = useMemo(() => {
    if (!form.image) return null;

    return (
      <Box mt={1}>
        <img
          src={form.image}
          alt="Preview"
          style={{ 
            width: 120, 
            height: 120, 
            objectFit: 'cover',
            marginTop: 10, 
            borderRadius: 8,
            border: '1px solid #ddd'
          }}
        />
        <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
          {imageFile ? imageFile.name : 'Current image'}
        </Typography>
      </Box>
    );
  }, [form.image, imageFile]);

  if (!open) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {editData ? "Edit Blog" : "Add New Blog"}
      </DialogTitle>
      
      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Grid container spacing={2}>
          {/* Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Blog Name"
              name="name"
              fullWidth
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter blog name"
              size="small"
            />
          </Grid>

          {/* Simple Category Input - Only Name Display */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Blog Category</InputLabel>
              <Select
                name="category"
                value={form.category}
                onChange={handleChange}
                label="Blog Category"
                required
              >
                {categoryOptions}
              </Select>
            </FormControl>
            
            {/* Refresh categories button */}
            <Button 
              size="small" 
              onClick={fetchCategories}
              disabled={loading}
              sx={{ mt: 1 }}
            >
              {loading ? <CircularProgress size={16} /> : 'Refresh Categories'}
            </Button>
          </Grid>

          {/* Intro */}
          <Grid item xs={12}>
            <TextField
              label="Intro"
              name="intro"
              fullWidth
              multiline
              rows={2}
              value={form.intro}
              onChange={handleChange}
              placeholder="Brief introduction about the blog"
              size="small"
            />
          </Grid>

          {/* Sort Order */}
          <Grid item xs={6}>
            <TextField
              label="Sort Order"
              name="sortOrder"
              fullWidth
              type="number"
              value={form.sortOrder}
              onChange={handleChange}
              placeholder="1"
              inputProps={{ min: 1 }}
              size="small"
            />
          </Grid>

          {/* Status */}
          <Grid item xs={6}>
            <Stack direction="row" spacing={1} alignItems="center" height="100%">
              <Typography variant="body2" color="textSecondary">
                Status:
              </Typography>
              <Typography 
                color={form.status === "active" ? "success.main" : "text.disabled"}
                fontWeight="medium"
                variant="body2"
              >
                {form.status === "active" ? "Active" : "Inactive"}
              </Typography>
              <Switch
                checked={form.status === "active"}
                onChange={(e) =>
                  updateForm({
                    status: e.target.checked ? "active" : "inactive",
                  })
                }
                color="success"
                size="small"
              />
            </Stack>
          </Grid>

          {/* Tags */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Tags
            </Typography>
            <Stack direction="row" spacing={1} mb={1}>
              <TextField
                label="Add Tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagInputKeyPress}
                size="small"
                placeholder="Enter tag and press Add or Enter"
                fullWidth
              />
              <Button 
                variant="outlined" 
                onClick={addTag}
                disabled={!tagInput.trim()}
                size="small"
              >
                Add
              </Button>
            </Stack>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {tagsDisplay}
            </Stack>
          </Grid>

          {/* Image */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Featured Image
            </Typography>
            <Button variant="contained" component="label" size="small">
              Upload Image
              <input 
                type="file" 
                hidden 
                onChange={handleImage}
                accept="image/*"
              />
            </Button>
            {imagePreview}
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              Description *
            </Typography>
            <JoditEditor
              ref={editorRef}
              value={form.description}
              config={editorConfig}
              onChange={handleEditorChange}
              tabIndex={1}
            />
          </Grid>

          {/* Meta Title */}
          <Grid item xs={12}>
            <TextField
              label="Meta Title"
              name="metaTitle"
              fullWidth
              value={form.metaTitle}
              onChange={handleChange}
              placeholder="SEO meta title"
              helperText="Optimized title for search engines"
              size="small"
            />
          </Grid>

          {/* Meta Description */}
          <Grid item xs={12}>
            <TextField
              label="Meta Description"
              name="metaDescription"
              fullWidth
              multiline
              rows={2}
              value={form.metaDescription}
              onChange={handleChange}
              placeholder="SEO meta description"
              helperText="Brief description for search engines"
              size="small"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="inherit" size="small">
          Cancel
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          disabled={!form.name.trim() || !form.category}
          size="small"
        >
          {editData ? "Update Blog" : "Create Blog"}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default BlogFormDialog;