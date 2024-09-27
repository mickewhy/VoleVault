import React, { useState, useRef, useEffect } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

const OptionMenu = ({ options, onSelect, placeholder }) => {
    const inputRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    const handleOptionSelect = (option) => {
        let selectedText = option.label + (option.displayText ? " (" + option.displayText + ")" : '')
        setSelectedOption(selectedText)
        onSelect(option.label)
        setIsOpen(false)
    }

    const inputWidth = useRef(0)
    useEffect(() => {
        if (inputRef.current)
            inputWidth.current = inputRef.current.offsetWidth
    }, [isOpen])

    return (
        <div className={`option-menu${isOpen ? ' open' : ''}`}>
            <input
                ref={inputRef}
                onClick={handleClick}
                readOnly
                value={selectedOption}
                placeholder={placeholder || ''}
            />
            {isOpen && (
                <List sx={{ paddingLeft: 0, paddingRight: 0, backgroundColor: '#222', position: 'absolute', width: inputWidth.current + 'px' }}>
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
                                    {option.image ? <img style={{ maxWidth: '100px', height: 'auto' }} src={option.image} alt={option.label} /> : ''}
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