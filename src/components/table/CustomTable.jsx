import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Search, Trash2, Edit, Plus } from "lucide-react";
import { DateFormat } from "../../utils/DateFormat";

const baseUrl = `${import.meta.env.VITE_API_BASE_URI}/uploads/images/`;

export default function CustomTable({
  data,
  columns,
  onCreate,
  onEdit,
  onDelete,
  statuses,
}) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    if (statuses && statuses.length > 0 && statuses[0].key !== "all") {
      statuses.unshift({ key: "all", label: "Semua" });
    }
  }, [statuses]);

  const onGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value);
  };

  const onStatusFilterChange = (e) => {
    setSelectedStatus(e.value);
  };

  const filteredData =
    data?.filter((item) => {
      return (
        !selectedStatus ||
        selectedStatus.key === "all" ||
        item.status.toLowerCase() === selectedStatus.key.toLowerCase()
      );
    }) || [];

  const statusRowFilterTemplate = (
    <Dropdown
      value={selectedStatus}
      options={statuses}
      onChange={onStatusFilterChange}
      placeholder="Pilih Status"
      optionLabel="label"
      className="w-full "
    />
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex justify-center gap-2">
        <Button
          size="sm"
          className="p-2  md:text-lg text-sm rounded-md"
          severity="warning"
          onClick={() => onEdit(rowData)}
        >
          <Edit style={{ color: "var(--surface-0) !important" }} />
        </Button>
        <Button
          size="sm"
          className="p-2  md:text-lg text-sm rounded-md"
          severity="danger"
          onClick={() => onDelete(rowData)}
        >
          <Trash2 />
        </Button>
      </div>
    );
  };

  const formatCellContent = (data, field) => {
    const fields = field.split(".");
    let value = data;

    for (const f of fields) {
      value = value ? value[f] : "";
    }

    const valueString = value ? value.toString() : "";

    if (field.includes("bannerImage")) {
      if (valueString) {
        return (
          <img
            src={`${baseUrl}${valueString}`}
            alt="banner artikel"
            className="w-52 h-full mx-auto"
          />
        );
      } else {
        return (
          <p className="flex justify-center items-center">
            Berita ini tidak memiliki banner
          </p>
        );
      }
    }

    if (field.includes("createdAt")) {
      if (valueString) {
        return (
          <p className="flex justify-center items-center">
            {DateFormat(valueString)}
          </p>
        );
      }
    }
    return <span>{valueString}</span>;
  };

  const indexTemplate = (data, props) => {
    return props.rowIndex + 1;
  };

  return (
    <div className="md:p-4 w-full ">
      <div className="card md:p-6 p-5 w-full flex flex-col gap-4">
        <div className="flex md:gap-10 gap-2 justify-center items-center md:mb-4">
          <div className="p-inputgroup ">
            <span className="p-inputgroup-addon bg-grays dark:bg-darkGrays">
              <Search size={16} />
            </span>
            <InputText
              type="search"
              value={globalFilter}
              onChange={onGlobalFilterChange}
              placeholder="Search..."
              className=""
            />
          </div>
          <div
            className={`flex gap-2 items-center ${
              statuses && statuses.length > 0
                ? "justify-center md:justify-end"
                : "justify-end"
            } `}
          >
            {statuses && statuses.length > 0 && (
              <div>{statusRowFilterTemplate}</div>
            )}
            <Button
              onClick={onCreate}
              className={`text-white block p-3 rounded-md`}
              label={<Plus size={25} />}
            />
          </div>
        </div>

        {filteredData.length > 0 ? (
          <DataTable
            value={filteredData}
            paginator
            rows={10}
            rowsPerPageOptions={[10, 25, 50, 75, 100]}
            showGridlines
            tableStyle={{ minWidth: "50rem" }}
            currentPageReportTemplate="{first} to {last} of {totalRecords} entries"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            globalFilter={globalFilter}
            editMode="row"
            removableSort
            resizableColumns
            sortMode="multiple"
          >
            <Column
              header="No"
              body={indexTemplate}
              headerStyle={{ width: "3%", minWidth: "3rem" }}
              bodyStyle={{ textAlign: "center" }}
            />
            {columns.map((col, index) => (
              <Column
                key={index}
                field={col.field}
                header={col.header}
                sortable
                body={(data) => formatCellContent(data, col.field)}
                className="p-4"
              />
            ))}

            <Column
              header="Aksi"
              headerStyle={{ width: "5%", minWidth: "2rem" }}
              body={actionBodyTemplate}
              bodyStyle={{ textAlign: "center" }}
            />
          </DataTable>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">
            Tidak ada data
          </div>
        )}
      </div>
    </div>
  );
}
