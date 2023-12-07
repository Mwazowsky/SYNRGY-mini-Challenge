import { Request, Response, NextFunction } from 'express';
import CarsService from '../../services/carsService'; // Import the created service
import authService from '../../services/authService';
import ResponseBuilder from '../../utils/ResponseBuilder';

import { IRequestWithAuth } from '../../middlewares/auth';

import media from '../../../config/media';

import { IRestController } from '../../interfaces/IRest'
import { IUser } from '../../interfaces/IAuth';
import { ICar } from '../../models/carsModel';

class CarsController implements IRestController {

  constructor() { }

  async healthCheck(req: Request, res: Response) {
    res.sendStatus(200)
  }

  async list(_: Request, res: Response) {
    try {
      const { data, count } = await CarsService.list();
      res.status(200).json({
        status: 'OK',
        data: { cars: data },
        meta: { total: count },
      });
    } catch (error: any) {
      res.status(500).json({
        status: 'FAIL',
        message: error.message,
      });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { car_id } = req.params;
      const car = await CarsService.get(parseInt(car_id, 10));

      if (!car) {
        res.status(404).json({
          status: 'FAIL',
          message: 'Car not found',
        });
        return;
      }

      res.status(200).json({
        status: 'OK',
        data: car,
      });
    } catch (error: any) {
      res.status(422).json({
        status: 'FAIL',
        message: error.message,
      });
    }
  }


  upload() {
    return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
      try {
        if (req.file) {
          const fileBase64 = req.file.buffer.toString('base64');
          const file = `data:${req.file.mimetype};base64,${fileBase64}`;
          const resultUpload = await media.storage.uploader.upload(
            file,
            (err, result) => {
              if (err) {
                return ResponseBuilder.response({
                  code: 403,
                  res,
                  data: 'failed upload to storage',
                });
              }
              return result;
            }
          );

          return ResponseBuilder.response({
            code: 200,
            res,
            data: resultUpload,
          });
        }

        ResponseBuilder.response({
          code: 404,
          res,
          data: 'file not found',
        });
      } catch (error) {
        ResponseBuilder.response({
          code: 500,
          data: 'upload failed',
          res,
        });
      }
    };
  }

  async create(req: IRequestWithAuth, res: Response, next: NextFunction) {
    try {
      CarsService.setUser = req.user as IUser;

      const result = await CarsService.create(req.body as ICar);

      return ResponseBuilder.response({
        res,
        code: 201,
        data: result,
        message: 'success create a new car',
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: IRequestWithAuth, res: Response, next: NextFunction) {
    try {
      const id = req.params?.car_id;
      CarsService.setUser = req.user as IUser;

      const result = await CarsService.update(parseInt(id, 10), req.body as ICar);

      return ResponseBuilder.response({
        res,
        code: 201,
        data: result,
        message: 'success updated a car',
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { car_id } = req.params;
      await CarsService.delete(parseInt(car_id, 10));
      res.status(200).json({
        status: 'OK',
        message: "Successfully deleted car",
      });
    } catch (error: any) {
      res.status(422).json({
        status: 'FAIL',
        message: error.message,
      });
    }
  }
}

export default new CarsController();
