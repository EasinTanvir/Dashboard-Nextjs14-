import React, { useState } from "react";
import { Category } from "../../../types/type";
import { Alert } from "@mui/material";
import Buttons from "../Buttons";
import { deleteCategoryAction } from "../../../serverAction/deleteCategoryAction";
import toast from "react-hot-toast";
import { SelectAll } from "@mui/icons-material";
import { Blocks } from "react-loader-spinner";

const CategoryList = ({ cateLists }: { cateLists: Category[] }) => {
  const [selctAll, setSelctAll] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const onSelectAllHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIdList = cateLists.map((item) => item.id);
      //@ts-ignore
      setSelctAll(allIdList);
    } else {
      setSelctAll([]);
    }
  };

  const onSelectHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelctAll((prevSelctAll) => [...prevSelctAll, value]);
    } else {
      setSelctAll((prevSelctAll) => prevSelctAll.filter((id) => id !== value));
    }
  };

  const onDeleteHandler = async () => {
    setLoading(true);
    //
    try {
      //@ts-ignore
      const res = await deleteCategoryAction(selctAll);
      setSelctAll([]);
      toast.success(res.message);
    } catch (err: any) {
      toast.error("Delete Category Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className=" text-xl font-bold text-topBar">All Category List</h1>
        {selctAll.length > 0 && (
          <Buttons
            onClick={onDeleteHandler}
            className="bg-rose-800 text-white "
          >
            {loading ? (
              <Blocks
                height="30"
                width="25"
                color="#4fa94d"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                visible={true}
              />
            ) : (
              "Delete"
            )}
          </Buttons>
        )}
      </div>

      <hr className="my-4" />

      <div className="mt-3">
        <div className="grid gap-3 grid-cols-5 bg-topBar px-4 py-2 rounded-sm text-white">
          <div className="flex gap-1 items-center font-semibold">
            <input
              type="checkbox"
              checked={selctAll.length === cateLists.length}
              onChange={onSelectAllHandler}
            />
            Select All
          </div>
          <div className="grid col-span-2 justify-center font-semibold">
            Name
          </div>
          <div className="grid col-span-2 justify-center font-semibold">
            Slug
          </div>
        </div>
        <hr className="my-2" />
        {cateLists.length > 0 ? (
          cateLists.map((item: Category) => (
            <div
              key={item.id}
              className="grid gap-3 grid-cols-5 mt-2 bg-slate-300 rounded-sm px-4 py-1"
            >
              <div className="flex gap-1 items-center text-sm">
                <input
                  checked={selctAll.includes(item.id || "")}
                  onChange={onSelectHandler}
                  value={item.id}
                  type="checkbox"
                  id={item.id}
                />
                <label htmlFor={item.id}>Select</label>
              </div>
              <div className="grid col-span-2 justify-center">{item.name}</div>
              <div className="grid col-span-2 justify-center">{item.slug}</div>
            </div>
          ))
        ) : (
          <Alert>No Category Added</Alert>
        )}
      </div>
    </div>
  );
};

export default CategoryList;