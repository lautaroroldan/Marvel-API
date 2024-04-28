import { Link } from "react-router-dom"
import { useCallback } from "react"
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import './Characters.css'
import { Chip, Pagination, Spinner, Tooltip, User } from "@nextui-org/react";
import { format } from 'date-fns'

import React from "react";
import { Character } from "../types/Character";

const EyeIcon = () => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
  >
    <path
      d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-external-link" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6"></path>
    <path d="M11 13l9 -9"></path>
    <path d="M15 4h5v5"></path>
  </svg>
)

function ListOfCharacters({ characters, page, totalPages, setPage, loading }: { characters: Character[], page: number, totalPages: number, setPage: any, loading: any }) {

  const renderCell = useCallback((user: Character, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: `${user.thumbnail.path}.${user.thumbnail.extension}` }}
            name={user.name}
          >
          </User>
        );
      case "modified":
        if (user.modified.startsWith('-')) {
          user.modified = user.modified.substring(1)
        }
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{user?.modified && format(new Date(user.modified), 'dd/MM/yy')}</p>
          </div>
        );
      case "comics":
        return (
          <Chip className="capitalize" color={user.comics.items.length == 0 ? "danger" : "success"} size="sm" variant="flat">
            {user.comics.items.length}
          </Chip>
        )
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="View">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Link to={`/characters/${user.id}`}>
                  <EyeIcon />
                </Link>
              </span>
            </Tooltip>
            <Tooltip content="Info">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <a href={user.urls[1].url} target="_blank">
                  <ExternalLinkIcon />
                </a>
              </span>
            </Tooltip>

          </div>
        );
    }
  }, []);
  const columns = [
    { name: "NOMBRE", uid: "name" },
    { name: "MODIFICADO", uid: "modified" },
    { name: "COMICS", uid: "comics" },
    { name: "ACCIONES", uid: "actions" },
  ];

  const BottomContent = () => {
    if (totalPages == 0) return <></>
    return (
      <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          initialPage={page}
          disableAnimation
          color="danger"
          page={page}
          total={totalPages}
          onChange={(page) => setPage(page)}
        />
      </div>
    )
  }

  return (
    <div className="px-4">
      <Table
        aria-label="Example table with custom cells"
        classNames={{
          wrapper: 'h-[400px]',
        }}
        bottomContentPlacement="outside"
        isHeaderSticky
        isCompact
        bottomContent={<BottomContent />}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={characters}
          loadingContent={<Spinner size="lg" color='danger' className='flex justify-center items-center' />}
          loadingState={loading}
          emptyContent={<NoCharactersResults />}
        >
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

function NoCharactersResults() {
  return (
    <p className="flex justify-center items-center">
      No se encontraron personajes para esta búsqueda ☹️
    </p>
  )
}

export default function Characters({ characters, page, setPage, totalPages, loading }: { characters: any[], page: number, totalPages: number, setPage: any, loading: boolean }) {

  return (
    <ListOfCharacters characters={characters} page={page} setPage={setPage} totalPages={totalPages} loading={loading} />
  )
}


