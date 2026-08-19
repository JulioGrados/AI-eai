import { createGlobalStyle } from 'styled-components'
import { color, font, radius, shadow, text, transition } from './theme'

/**
 * Estilos globales.
 *
 * Ant Design 3 se importa ya compilado con su azul por defecto (#1890ff),
 * así que aquí se re-arma sobre el azul de marca (#0080ff) y se bajan
 * bordes, sombras y radios a un lenguaje visual más plano y minimalista.
 */
export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    background-color: ${color.bg};
    color: ${color.inkBody};
    font-family: ${font.family};
    font-size: ${text.body};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${font.family};
    color: ${color.ink};
    font-weight: 600;
    letter-spacing: -0.01em;
    margin: 0;
  }

  a {
    color: ${color.brand};
    transition: color ${transition.fast};
  }

  a:hover {
    color: ${color.brandHover};
  }

  ::selection {
    background: ${color.brandTintStrong};
    color: ${color.ink};
  }

  /* Scrollbars discretas */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${color.lineStrong} transparent;
  }

  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background: ${color.lineStrong};
    border-radius: ${radius.pill};
  }

  *::-webkit-scrollbar-thumb:hover {
    background: ${color.inkFaint};
  }

  /* ---------------------------------------------------------------- */
  /* Ant Design: tipografía y color de marca                           */
  /* ---------------------------------------------------------------- */

  .ant-layout,
  .ant-menu,
  .ant-btn,
  .ant-input,
  .ant-input-number,
  .ant-select,
  .ant-modal,
  .ant-dropdown,
  .ant-message,
  .ant-tabs,
  .ant-form,
  .ant-upload,
  .ant-alert,
  .ant-tooltip {
    font-family: ${font.family};
  }

  .ant-layout {
    background: ${color.bg};
  }

  /* Botones */
  .ant-btn {
    height: 38px;
    padding: 0 18px;
    border-radius: ${radius.sm};
    border-color: ${color.lineStrong};
    color: ${color.inkStrong};
    font-weight: 500;
    box-shadow: none;
    transition: all ${transition.fast};
  }

  .ant-btn:hover,
  .ant-btn:focus {
    color: ${color.brand};
    border-color: ${color.brand};
  }

  .ant-btn-lg {
    height: 44px;
    padding: 0 24px;
    font-size: ${text.body};
    border-radius: ${radius.sm};
  }

  .ant-btn-sm {
    height: 30px;
    padding: 0 12px;
  }

  .ant-btn.ant-btn-primary {
    background: ${color.brand};
    border-color: ${color.brand};
    color: ${color.white};
    box-shadow: ${shadow.brand};
  }

  .ant-btn.ant-btn-primary:hover,
  .ant-btn.ant-btn-primary:focus {
    background: ${color.brandHover};
    border-color: ${color.brandHover};
    color: ${color.white};
  }

  .ant-btn.ant-btn-primary:active {
    background: ${color.brandActive};
    border-color: ${color.brandActive};
  }

  .ant-btn.ant-btn-primary[disabled],
  .ant-btn.ant-btn-primary[disabled]:hover {
    background: ${color.lineStrong};
    border-color: ${color.lineStrong};
    color: ${color.white};
    box-shadow: none;
  }

  .ant-btn-danger {
    background: ${color.danger};
    border-color: ${color.danger};
  }

  /* Campos de formulario */
  .ant-input,
  .ant-input-number,
  .ant-input-number-input,
  .ant-select-selection,
  .ant-time-picker-input,
  .ant-calendar-picker-input {
    border-radius: ${radius.sm};
    border-color: ${color.lineStrong};
    color: ${color.ink};
    transition: all ${transition.fast};
  }

  .ant-input,
  .ant-select-selection--single,
  .ant-input-number {
    height: 40px;
  }

  .ant-input {
    padding: 8px 12px;
  }

  .ant-select-selection--single .ant-select-selection__rendered {
    line-height: 38px;
  }

  .ant-input-number-input {
    height: 38px;
  }

  .ant-input:hover,
  .ant-input-number:hover,
  .ant-select-selection:hover {
    border-color: ${color.brand};
  }

  .ant-input:focus,
  .ant-input-number-focused,
  .ant-select-open .ant-select-selection,
  .ant-select-focused .ant-select-selection {
    border-color: ${color.brand};
    box-shadow: 0 0 0 3px ${color.brandTint};
  }

  .ant-input::placeholder,
  .ant-input-number-input::placeholder {
    color: ${color.inkFaint};
  }

  .ant-input[disabled],
  .ant-select-disabled .ant-select-selection {
    background: ${color.surfaceSunken};
    color: ${color.inkMuted};
  }

  /* Formularios */
  .ant-form-item {
    margin-bottom: 20px;
  }

  .ant-form-item-label {
    line-height: 1.4;
    padding-bottom: 6px;
  }

  .ant-form-item-label > label {
    color: ${color.inkStrong};
    font-size: ${text.small};
    font-weight: 500;
  }

  .ant-form-item-label > label::after {
    content: '';
    margin: 0;
  }

  .ant-form-item-required::before {
    color: ${color.brand};
  }

  .ant-form-explain {
    font-size: ${text.tiny};
    margin-top: 4px;
  }

  /* Menú lateral */
  .ant-menu {
    border: none;
    color: ${color.inkBody};
    font-weight: 500;
  }

  .ant-menu-inline {
    border-right: none;
  }

  .ant-menu-item,
  .ant-menu-submenu-title {
    border-radius: ${radius.sm};
    margin: 2px 0 !important;
    height: 42px;
    line-height: 42px;
    transition: all ${transition.fast};
  }

  .ant-menu-item:hover,
  .ant-menu-submenu-title:hover,
  .ant-menu-item-active {
    color: ${color.brand};
    background: ${color.brandTint};
  }

  .ant-menu-item-selected {
    color: ${color.brand};
    background-color: ${color.brandTint} !important;
    font-weight: 600;
  }

  .ant-menu-item-selected::after {
    border-right: 3px solid ${color.brand};
    border-radius: ${radius.pill};
  }

  .ant-menu-submenu-selected {
    color: ${color.brand};
  }

  .ant-menu-inline .ant-menu-item::after {
    right: 0;
  }

  /* Tabs */
  .ant-tabs-bar {
    border-bottom-color: ${color.line};
    margin-bottom: 24px;
  }

  .ant-tabs-nav .ant-tabs-tab {
    padding: 10px 4px;
    margin-right: 28px;
    color: ${color.inkMuted};
    font-weight: 500;
    transition: color ${transition.fast};
  }

  .ant-tabs-nav .ant-tabs-tab:hover {
    color: ${color.brand};
  }

  .ant-tabs-nav .ant-tabs-tab-active {
    color: ${color.brand};
    font-weight: 600;
  }

  .ant-tabs-ink-bar {
    height: 2px;
    background: ${color.brand};
    border-radius: ${radius.pill};
  }

  /* Modales */
  .ant-modal-content {
    border-radius: ${radius.lg};
    overflow: hidden;
    box-shadow: ${shadow.lg};
  }

  .ant-modal-header {
    border-bottom: 1px solid ${color.line};
    padding: 18px 24px;
  }

  .ant-modal-title {
    color: ${color.ink};
    font-weight: 600;
  }

  .ant-modal-body {
    padding: 24px;
    color: ${color.inkBody};
  }

  .ant-modal-footer {
    border-top: 1px solid ${color.line};
    padding: 14px 24px;
  }

  .ant-modal-confirm-body .ant-modal-confirm-title {
    color: ${color.ink};
    font-weight: 600;
  }

  .ant-modal-confirm-body .ant-modal-confirm-content {
    color: ${color.inkMuted};
    margin-top: 8px;
  }

  /* Mensajes y notificaciones */
  .ant-message-notice-content {
    border-radius: ${radius.md};
    box-shadow: ${shadow.md};
    padding: 12px 18px;
    color: ${color.inkStrong};
  }

  /* Dropdown */
  .ant-dropdown-menu {
    border-radius: ${radius.md};
    box-shadow: ${shadow.md};
    padding: 6px;
    border: 1px solid ${color.line};
  }

  .ant-dropdown-menu-item {
    border-radius: ${radius.sm};
    padding: 8px 12px;
    color: ${color.inkBody};
  }

  .ant-dropdown-menu-item:hover {
    background: ${color.brandTint};
    color: ${color.brand};
  }

  /* Upload */
  .ant-upload.ant-upload-select {
    display: block;
  }

  .ant-upload-list-item {
    border-radius: ${radius.sm};
    margin-top: 6px;
  }

  .ant-upload-list-item-info {
    border-radius: ${radius.sm};
    padding: 2px 6px;
    transition: background ${transition.fast};
  }

  .ant-upload-list-item:hover .ant-upload-list-item-info {
    background: ${color.brandTint};
  }

  .ant-upload-list-item-name {
    color: ${color.inkBody};
  }

  /* Spin */
  .ant-spin-dot-item {
    background-color: ${color.brand};
  }

  .ant-spin {
    color: ${color.brand};
  }

  /* Alerts */
  .ant-alert {
    border-radius: ${radius.sm};
    border: none;
  }

  /* Tablas y paginación (heredado del proyecto original) */
  .ant-table-pagination.ant-pagination {
    margin: 16px 20px;
  }

  .ant-pagination-item-active {
    border-color: ${color.brand};
  }

  .ant-pagination-item-active a {
    color: ${color.brand};
  }

  .ant-card-body {
    padding: 0;
  }

  /* Tooltip */
  .ant-tooltip-inner {
    border-radius: ${radius.sm};
    font-size: ${text.tiny};
    padding: 6px 10px;
    background: ${color.ink};
  }

  .ant-tooltip-arrow::before {
    background: ${color.ink};
  }
`

export default GlobalStyle
