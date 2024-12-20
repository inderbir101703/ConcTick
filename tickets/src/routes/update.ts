import { Router,Response,Request } from "express";
import { Ticket } from "../models/ticket";
import { BadRequestError, InvalidDetailsError, NotFoundError } from "@tiktickets/common";
import { RequireAuth,ValidateRequest } from "@tiktickets/common";
import { body } from "express-validator";
import { natsWrapper } from "../nats-wrapper";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-pubisher";

const router= Router()


router.put(
    '/api/tickets/:id',
    RequireAuth,
    [
      body('title').not().isEmpty().withMessage('Title is required'),
      body('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be provided and must be greater than 0'),
    ],
    ValidateRequest,
    async (req: Request, res: Response) => {
      const ticket = await Ticket.findById(req.params.id);
  
      if (!ticket) {
        throw new NotFoundError();
      }
     if(ticket.orderId){
      throw new BadRequestError('can not edit a  reserved ticket ')
     }
      if (ticket.userId !== req.currentUser!.id) {
        throw new InvalidDetailsError('invalid details');
      }
  
      ticket.set({
        title: req.body.title,
        price: req.body.price,
      });
      await ticket.save();
      new TicketUpdatedPublisher(natsWrapper.client).publish({
        id:ticket.id,
        title:ticket.title,
        price:ticket.price,
        userId:ticket.userId,
        version:ticket.version
      
      })
  
      res.send(ticket);
    }
  );
  
export {router as UpdateTicket}

