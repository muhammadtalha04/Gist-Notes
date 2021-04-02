import styled from 'styled-components';
import { Colors } from '../../constants/colors';

export const Nav = styled.nav`
    background-color: ${Colors.PRIMARY.background} !important;
    color: ${Colors.PRIMARY.color};
`;

export const Div = styled.div`
`;

export const RightDiv = styled.div`
    align-items: center;
    width: 100%;
    text-align: right;
`;

export const DropdownWrapper = styled.span`
    margin-left: 10px;
`;

export const DropdownButton = styled.span`
    cursor: pointer;
`;

export const Dropdown = styled.div`
    position: absolute;
    background: #fff;
    color: #000;
    top: 35px;
    right: 0;
    width: 180px;
    z-index: 100;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.04);
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
    padding-bottom: 5px;
    padding-top: 3px;
`;

export const DropdownItem = styled.div`
    padding: 5px 15px;
    text-align: left;
    font-size: 11.5pt;
    cursor: pointer;
`;

export const DropdownItemHover = styled(DropdownItem)`
    &:hover {
        background-color: #0366d6;
        color: #fff;
    }
`;

export const Bold = styled.strong``;

export const HR = styled.hr`
    margin: 3px 0px;
`;