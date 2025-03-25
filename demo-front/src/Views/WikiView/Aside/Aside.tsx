import React, { useEffect, useRef } from "react";
import { inject, observer } from "mobx-react";
import "./Aside.css";
import { AsideStore } from "Stores/WikiView/AsideStore";
import { AsideElementDTO } from "DTO/WikiView/AsideElementDTO";
import { WikiAsideElement } from "./AsideElement/AsideElement";
import { MainStore } from "Stores/MainStore";
import { Await } from "react-router-dom";
import { useLoaderData } from "utils/route/UseLoaderData";
import { useAsyncValue } from "utils/route/UseAsyncValue";
import { LC_FORM_ID } from "LCConstants";

const AsideTree: React.FC<{ asideStore: AsideStore }> = observer(
  ({ asideStore }) => {
    let asideData = useAsyncValue<AsideElementDTO[]>();

    useEffect(() => {
      asideStore?.setAsideTree(asideData);
    }, [asideData]);

    return (
      <>
        {asideStore.asideLC_FormFuseTree.length !== 0 && (
          <>
            <label>{LC_FORM_ID}:</label>
            {asideStore.asideLC_FormFuseTree.map(
              (asideElement: AsideElementDTO) => (
                <WikiAsideElement
                  key={asideElement.id}
                  asideElement={asideElement}
                />
              )
            )}
            <label>{"Все:"}</label>
          </>
        )}
        {asideStore.asideFuseTree.map((asideElement: AsideElementDTO) => (
          <WikiAsideElement key={asideElement.id} asideElement={asideElement} />
        ))}
      </>
    );
  }
);

const WikiAside: React.FC<{ asideStore?: AsideStore }> = observer(
  ({ asideStore }) => {
    let asideLoader = useLoaderData<{
      loadAside: Promise<AsideElementDTO[]>;
    }>();

    let fuseRef: HTMLInputElement | null;

    useEffect(() => {
      if (fuseRef) fuseRef.value = "";
      asideStore!.changeFusePattern("");
    }, [asideLoader]);

    return (
      <aside>
        <h1>{asideStore?.asideTitle}</h1>
        <input
          type="text"
          placeholder="Поиск"
          ref={(input) => (fuseRef = input)}
          onChange={(e) => asideStore?.changeFusePattern(e.currentTarget.value)}
        ></input>
        <React.Suspense fallback={<p>Загрузка</p>}>
          <Await
            resolve={asideLoader.loadAside}
            errorElement={<p>Возникла ошибка!</p>}
          >
            <AsideTree asideStore={asideStore!} />
          </Await>
        </React.Suspense>
      </aside>
    );
  }
);

export default inject(({ store }: { store: MainStore }) => ({
  asideStore: store.asideStore,
}))(WikiAside);
