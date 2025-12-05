import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Box, Button, Typography, Table, TableHead, TableBody, TableRow, TableCell,
  IconButton, Checkbox, TextField, Stack, TablePagination, Paper, Chip,
  Dialog, Snackbar, Alert, CircularProgress, Tooltip
} from "@mui/material";
import {
  Edit, Delete, CheckCircle, Cancel, ArrowBack,
  Image as ImageIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DiseaseFormDialog from "../DailogForm/DiseaseFormDialog";

// Constants
const API_BASE_URL ="http://localhost:3000/v1/api";
const DEFAULT_IMAGE = "/placeholder.png";

// API Instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const Diseases = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    diseases: [],
    loading: false,
    page: 0,
    rowsPerPage: 10,
    search: "",
    dialogOpen: false,
    editingDisease: null,
    selectedDiseases: [],
    selectedImage: null,
    imageModalOpen: false,
    snackbar: { open: false, message: "", severity: "success" }
  });

  // State setters
  const updateState = (updates) => setState(prev => ({ ...prev, ...updates }));

  // API Calls
  const fetchDiseases = useCallback(async (searchTerm = "") => {
    updateState({ loading: true });
    try {
      const params = searchTerm ? { search: searchTerm } : {};
      const { data } = await api.get("/diseasepost", { params });
      
      const diseases = data?.diseases || data || [];
      updateState({ diseases, loading: false });
    } catch (error) {
      showSnackbar(error.response?.data?.message || "Failed to fetch diseases", "error");
      updateState({ diseases: [], loading: false });
    }
  }, []);

  const deleteDisease = async (diseaseId) => {
    if (!window.confirm("Are you sure you want to delete this disease?")) return;
    
    try {
      await api.delete(`/diseasepost/${diseaseId}`);
      setState(prev => ({
        ...prev,
        diseases: prev.diseases.filter(d => d._id !== diseaseId)
      }));
      showSnackbar("Disease deleted successfully");
    } catch (error) {
      showSnackbar(error.response?.data?.message || "Delete failed", "error");
    }
  };

  const deleteSelectedDiseases = async () => {
    const { selectedDiseases } = state;
    if (selectedDiseases.length === 0) {
      showSnackbar("Please select diseases to delete", "warning");
      return;
    }

    if (!window.confirm(`Delete ${selectedDiseases.length} disease(s)?`)) return;

    try {
      await api.delete("/diseasepost", { data: { ids: selectedDiseases } });
      setState(prev => ({
        ...prev,
        diseases: prev.diseases.filter(d => !selectedDiseases.includes(d._id)),
        selectedDiseases: []
      }));
      showSnackbar(`${selectedDiseases.length} disease(s) deleted`);
    } catch (error) {
      showSnackbar(error.response?.data?.message || "Delete failed", "error");
    }
  };

  const toggleStatus = async (diseaseId) => {
    try {
      const { data } = await api.patch(`/diseasepost/${diseaseId}/toggle-status`);
      if (data?.disease) {
        setState(prev => ({
          ...prev,
          diseases: prev.diseases.map(d => 
            d._id === diseaseId ? { ...d, status: data.disease.status } : d
          )
        }));
        showSnackbar(`Disease ${data.disease.status === "Active" ? "activated" : "deactivated"}`);
      }
    } catch (error) {
      showSnackbar(error.response?.data?.message || "Toggle failed", "error");
    }
  };

  const toggleActive = async (diseaseId) => {
    try {
      const { data } = await api.patch(`/diseasepost/${diseaseId}/toggle-active`);
      if (data?.disease) {
        setState(prev => ({
          ...prev,
          diseases: prev.diseases.map(d => 
            d._id === diseaseId ? { ...d, isActive: data.disease.isActive } : d
          )
        }));
        showSnackbar(`Disease ${data.disease.isActive ? "activated" : "deactivated"}`);
      }
    } catch (error) {
      showSnackbar(error.response?.data?.message || "Toggle failed", "error");
    }
  };

  // Handlers
  const showSnackbar = (message, severity = "success") => {
    updateState({ snackbar: { open: true, message, severity } });
  };

  const handleCloseSnackbar = () => {
    updateState({ snackbar: { ...state.snackbar, open: false } });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    updateState({ search: value });
    clearTimeout(state.searchTimeout);
    const searchTimeout = setTimeout(() => fetchDiseases(value), 500);
    updateState({ searchTimeout });
  };

  const handleSelectDisease = (diseaseId) => {
    setState(prev => ({
      ...prev,
      selectedDiseases: prev.selectedDiseases.includes(diseaseId)
        ? prev.selectedDiseases.filter(id => id !== diseaseId)
        : [...prev.selectedDiseases, diseaseId]
    }));
  };

  const handleSelectAll = (e) => {
    const { filteredData } = getFilteredData();
    updateState({
      selectedDiseases: e.target.checked ? filteredData.map(d => d._id) : []
    });
  };

  const handleEdit = (disease) => {
    updateState({ editingDisease: disease, dialogOpen: true });
  };

  const handleDialogClose = () => {
    updateState({ dialogOpen: false, editingDisease: null });
  };

  const handleDialogSuccess = () => {
    fetchDiseases(state.search);
    showSnackbar(`Disease ${state.editingDisease ? "updated" : "created"} successfully`);
    handleDialogClose();
  };

  // Utilities
  const getFilteredData = () => {
    const { diseases, search } = state;
    const filteredData = diseases.filter(disease => 
      disease.name?.toLowerCase().includes(search.toLowerCase()) ||
      disease.department?.toLowerCase().includes(search.toLowerCase())
    );
    return { filteredData };
  };

  const getImageUrl = (iconimg) => 
    iconimg ? `${API_BASE_URL}/uploads/diseases/${iconimg}` : DEFAULT_IMAGE;

  // Effects
  useEffect(() => {
    fetchDiseases();
  }, [fetchDiseases]);

  // Render helpers
  const renderTableHeaders = () => (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={state.selectedDiseases.length > 0 && state.selectedDiseases.length < getFilteredData().filteredData.length}
            checked={getFilteredData().filteredData.length > 0 && state.selectedDiseases.length === getFilteredData().filteredData.length}
            onChange={handleSelectAll}
          />
        </TableCell>
        {["Image", "Name", "Department", "Sort Order", "Show Home", "Status", "Actions"].map(header => (
          <TableCell key={header}><b>{header}</b></TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  const renderDiseaseRow = (item) => (
    <TableRow key={item._id} hover>
      <TableCell padding="checkbox">
        <Checkbox
          checked={state.selectedDiseases.includes(item._id)}
          onChange={() => handleSelectDisease(item._id)}
        />
      </TableCell>
      
      <TableCell>
        <Box
          component="img"
          src={getImageUrl(item.iconimg)}
          alt={item.name}
          sx={{
            width: 50, height: 50, borderRadius: 2, cursor: "pointer",
            objectFit: "cover", border: "1px solid #e0e0e0"
          }}
          onClick={() => updateState({ selectedImage: getImageUrl(item.iconimg), imageModalOpen: true })}
          onError={(e) => { e.target.src = DEFAULT_IMAGE; }}
        />
      </TableCell>

      <TableCell>
        <Typography variant="body2" fontWeight="medium">{item.name}</Typography>
        {item.description && (
          <Typography variant="caption" color="textSecondary" display="block">
            {item.description.length > 50 ? `${item.description.substring(0, 50)}...` : item.description}
          </Typography>
        )}
      </TableCell>

      <TableCell><Chip label={item.department} size="small" variant="outlined" /></TableCell>
      <TableCell><Typography align="center">{item.sortOrder}</Typography></TableCell>
      
      <TableCell>
        <Chip
          label={item.showHome ? "Yes" : "No"}
          color={item.showHome ? "success" : "default"}
          size="small"
          variant={item.showHome ? "filled" : "outlined"}
        />
      </TableCell>

      {/* <TableCell>
        <Tooltip title={`Toggle ${item.status === "Active" ? "Inactive" : "Active"}`}>
          <IconButton onClick={() => toggleStatus(item._id)} size="small">
            {item.status === "Active" ? 
              <CheckCircle sx={{ color: "green" }} /> : 
              <Cancel sx={{ color: "red" }} />
            }
          </IconButton>
        </Tooltip>
      </TableCell> */}

      <TableCell>
        <Tooltip title={`Toggle ${item.isActive ? "Inactive" : "Active"}`}>
          <IconButton onClick={() => toggleActive(item._id)} size="small">
            {item.isActive ? 
              <CheckCircle sx={{ color: "green" }} /> : 
              <Cancel sx={{ color: "red" }} />
            }
          </IconButton>
        </Tooltip>
      </TableCell>

      <TableCell>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton 
              sx={{ bgcolor: "primary.main", color: "white", '&:hover': { bgcolor: "primary.dark" } }}
              onClick={() => handleEdit(item)}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton 
              sx={{ bgcolor: "error.main", color: "white", '&:hover': { bgcolor: "error.dark" } }}
              onClick={() => deleteDisease(item._id)}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  );

  const { filteredData } = getFilteredData();
  const paginatedData = filteredData.slice(
    state.page * state.rowsPerPage,
    state.page * state.rowsPerPage + state.rowsPerPage
  );

  return (
    <Box p={3}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <IconButton onClick={() => navigate("/admin")} color="primary">
          <ArrowBack />
        </IconButton>
        <Typography>
          Manage Items / <Box component="span" sx={{ color: "#347deb", ml: 1 }}>Diseases</Box>
        </Typography>
      </Stack>

      {/* Actions */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Diseases {state.diseases.length > 0 && `(${state.diseases.length})`}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={() => updateState({ dialogOpen: true, editingDisease: null })}>
            + Add New
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            startIcon={<Delete />}
            onClick={deleteSelectedDiseases}
            disabled={state.selectedDiseases.length === 0}
          >
            DELETE ({state.selectedDiseases.length})
          </Button>
        </Stack>
      </Stack>

      {/* Table */}
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <TextField
            size="small"
            placeholder="Search diseases..."
            value={state.search}
            onChange={handleSearch}
            sx={{ width: 300 }}
          />
          <Typography variant="body2" color="textSecondary">
            Showing {filteredData.length} of {state.diseases.length} diseases
          </Typography>
        </Stack>

        <Table>
          {renderTableHeaders()}
          <TableBody>
            {state.loading ? (
              <TableRow><TableCell colSpan={9} align="center"><CircularProgress /></TableCell></TableRow>
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <Typography color="textSecondary">
                    {state.diseases.length === 0 ? "No diseases found" : "No matching diseases"}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map(renderDiseaseRow)
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredData.length}
          page={state.page}
          onPageChange={(e, newPage) => updateState({ page: newPage })}
          rowsPerPage={state.rowsPerPage}
          onRowsPerPageChange={(e) => updateState({ rowsPerPage: +e.target.value, page: 0 })}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Paper>

      {/* Modals */}
      <DiseaseFormDialog
        open={state.dialogOpen}
        handleClose={handleDialogClose}
        onSuccess={handleDialogSuccess}
        initialData={state.editingDisease}
      />

      <Dialog open={state.imageModalOpen} onClose={() => updateState({ imageModalOpen: false })} maxWidth="sm" fullWidth>
        <Box p={2}>
          <Box component="img" src={state.selectedImage} alt="Preview" sx={{ width: "100%", borderRadius: 1 }} />
        </Box>
      </Dialog>

      <Snackbar open={state.snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={state.snackbar.severity}>
          {state.snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Diseases;