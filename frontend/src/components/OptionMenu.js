import React, { useState, useRef } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

const OptionMenu = ({ options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false)
    const inputRef = useRef(null)
    const [selectedOption, setSelectedOption] = useState(options[0].label + " (" + options[0].displayText + ")")

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    const handleOptionSelect = (option) => {
        setSelectedOption(option.label + " (" + option.displayText + ")")
        onSelect(option.label)
        setIsOpen(false)
    }

    return (
        <div className={`option-menu ${isOpen ? 'open' : ''}`}>
            <input
                ref={inputRef}
                onClick={handleClick}
                readOnly
                value={selectedOption}
            />
            {isOpen && (
                <List sx={{ paddingLeft: 0, paddingRight: 0, backgroundColor: '#111' }}>
                    {options.map((option) => (
                        <ListItem key={option.label} disablePadding>
                            <ListItemButton
                                sx={{
                                    color: 'white',
                                    '&:hover': { backgroundColor: '#333' },
                                }}
                                onClick={() => {
                                    handleOptionSelect(option)
                                }}
                            >
                                <ListItemIcon sx={{ color: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                    <img style={{ maxWidth: '100px', height: 'auto' }} src={option.image} alt={option.label} />
                                    <ListItemText disableTypography primary={option.label} sx={{ color: 'white', fontFamily: "Barlow Semi Condensed" }} />
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    )
}

export default OptionMenu