import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Box,
  Switch,
  Typography,
  Button,
  IconButton,
  Stack,
  Dialog,
  DialogContent,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ItemListingDialog from "../DailogForm/ItemListingDailog"; // ✅ Ensure this path is correct

// ✅ Your API base URL
const BASE_URL = "http://localhost:3000";

function Items() {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // ✅ Fetch all items
  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/v1/api/get_product`);
      setItems(response.data || []);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ✅ Toggle status (active/inactive)
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await axios.put(`${BASE_URL}/v1/api/put_status/${id}/toggle-status`, {
        isActive: !currentStatus,
      });
      fetchItems();
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  // ✅ Columns matching your table header
  const columns = [
    { field: "_id", headerName: "ID", width: 120 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "department", headerName: "Department", width: 150 },
    { field: "sortOrder", headerName: "Sort order", width: 130 },
    {
      field: "isActive",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Switch
          checked={params.value}
          onChange={() => handleToggleStatus(params.row._id, params.value)}
        />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            color="primary"
            onClick={() => console.log("Edit", params.row._id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => console.log("Delete", params.row._id)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box p={2}>
      {/* ✅ Breadcrumb Navigation */}
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <IconButton onClick={() => navigate("/admin")} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Typography>
          <Box component="span" sx={{ cursor: "pointer" }}>
            Manage Items /
          </Box>
          <Box component="span" sx={{ color: "#347deb", ml: 1 }}>
            Items
          </Box>
        </Typography>
      </Stack>

      {/* ✅ Title + Actions */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight="bold">
          Items
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<AdminPanelSettingsIcon />}
            onClick={() => navigate("/admin")}
          >
            Admin
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setDialogOpen(true)}
          >
            Add New
          </Button>
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
            DELETE
          </Button>
        </Stack>
      </Stack>

      {/* ✅ Data Table */}
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={items}
          columns={columns}
          getRowId={(row) => row._id}
          loading={loading}
          checkboxSelection
          pagination
          pageSizeOptions={[10, 20, 50]}
          components={{ Toolbar: GridToolbar }}
          disableRowSelectionOnClick
        />
      </Box>

      {/* ✅ Add/Edit Dialog */}
      <ItemListingDialog
        open={dialogOpen}
        handleClose={() => {
          setDialogOpen(false);
          fetchItems(); // Refresh table on close
        }}
      />

      {/* ✅ Image Preview Dialog */}
      <Dialog
        open={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        maxWidth="sm"
      >
        <DialogContent>
          <Box
            component="img"
            src={selectedImage}
            alt="Preview"
            sx={{ width: "100%", maxHeight: "70vh", objectFit: "contain" }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Items;
