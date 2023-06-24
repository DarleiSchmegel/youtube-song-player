import React, { useContext, useEffect, useState } from "react";
import { listItemFiels } from "../../../Utils/Fiels/listItemFiels";
import Input from "./Input";
import { PlayListContext } from "../contexts/playListContex";
import Button from "./Button";

interface CreateUpdatLinkProps {
  id?: string;
  onConfirm?: () => void;
}

export function CreateUpdatLink({ id, onConfirm }: CreateUpdatLinkProps) {
  const { playList, getPlayListItem, addLink } = useContext(PlayListContext);
  const [fieldsState, setFieldsState] = useState({});

  useEffect(() => {
    if (id) {
      getPlayListItem(id);
    }
  }, [id]);

  function handleChange(e) {
    e.preventDefault();
    setFieldsState({
      ...fieldsState,
      [e.target.id]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const isOk = listItemFiels.findIndex((field) => {
      if (!!id && !fieldsState[field.id]) return false;
      if (field.isRequired && !fieldsState[field.id]) return true;
      if (String(fieldsState[field.id]).trim() === "") return true;
    });
    if (isOk !== -1) {
      alert("Preencha o de Campo: " + listItemFiels[isOk].labelText);
      return;
    }

    const input = {
      id: fieldsState["url"],
      ...fieldsState,
    };
    console.log("Foi", input);
    // addLink(input);
    onConfirm && onConfirm();
  }
  return (
    <div className="">
      <div>
        {listItemFiels.map((field) => {
          return (
            <Input
              customClass={`col-span-${field.width}`}
              key={field.id}
              handleChange={handleChange}
              value={
                fieldsState[field.id]
                  ? fieldsState[field.id]
                  : playList[field.id] || ""
              }
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={"input"}
              isRequired={field.isRequired}
              selectFilds={field.selectFilds}
              placeholder={field.placeholder}
              // disabled={!isEnabled}
              // isHidden={isHedden(field.id)}
            />
          );
        })}
      </div>
      <div className="mt-4 flex flex-row-reverse">
        <Button onClick={handleSubmit} variant="secundary">
          {id ? "Criar" : "Salvar"}
        </Button>
      </div>
    </div>
  );
}
