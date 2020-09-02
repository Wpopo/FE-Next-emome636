import { createAction } from 'redux-actions';

export const productReset = createAction('PRODUCT_RESET');
export const setInitTicketList = createAction('SET_INIT_TICKET_LIST');
export const addTicket = createAction('ADD_TICKET');
export const reduceTicket = createAction('REDUCE_TICKET');
export const setBookingTicket = createAction('SET_BOOKING_TICKET');
