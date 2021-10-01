import React, { Component, createRef } from 'react'
import { Dropdown, DropdownItemProps, DropdownProps } from 'semantic-ui-react'
import { Sort } from '../../../generated/graphql'

const tagOptions = [
    {
        key: 'Newest',
        text: 'Newest',
        value: Sort.Asc,
        label: { color: 'red', empty: true, circular: true },
    },
    {
        key: 'Oldest',
        text: 'Oldest',
        value: Sort.Desc,
        label: { color: 'blue', empty: true, circular: true },
    },
    {
        key: 'Top Voted',
        text: 'Top Voted',
        value: Sort.TopVotes,
        label: { color: 'black', empty: true, circular: true },
    },
]

interface IFilterComments {
    currentSort: Sort
    changeCurrentSort: React.Dispatch<React.SetStateAction<Sort>>
}

export const FilterComments: React.FC<IFilterComments> = ({
    currentSort,
    changeCurrentSort,
}) => {
    const dropDownRef = createRef<Component<DropdownProps, any, any>>()

    const setFilterOption = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        { value }: DropdownItemProps,
    ) => {
        e.preventDefault()
        changeCurrentSort(value as Sort)
    }

    const displayText = () => {
        const value = tagOptions.find((option) => option.value === currentSort)
        if (value) {
            return value.text
        } else {
            return ''
        }
    }

    return (
        <Dropdown
            text={displayText()}
            icon="filter"
            floating
            labeled
            button
            className="icon"
            ref={dropDownRef}
        >
            <Dropdown.Menu>
                {/* <Input icon="search" iconPosition="left" className="search" /> */}
                <Dropdown.Divider />
                <Dropdown.Header icon="tags" content="Tag Label" />
                <Dropdown.Menu scrolling>
                    {tagOptions.map((option) => (
                        <Dropdown.Item onClick={setFilterOption} {...option} />
                    ))}
                </Dropdown.Menu>
            </Dropdown.Menu>
        </Dropdown>
    )
}
