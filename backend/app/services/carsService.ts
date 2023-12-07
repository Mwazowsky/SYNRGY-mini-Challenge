import CarsRepository from "../repositories/carsRepository";

import { IUser } from "../interfaces/IAuth";

class CarsService {
  private _user: IUser | undefined;

  constructor() {}

  async create(requestBody: any) {
    try {
      return await CarsRepository.create(requestBody);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async update(car_id: number, requestBody: any) {
    try {
      return await CarsRepository.update(car_id, requestBody);
    } catch (err) {
      throw err;
    }
  }

  async delete(car_id: number) {
    try {
      return await CarsRepository.delete(car_id);
    } catch (err) {
      throw err;
    }
  }

  async list() {
    try {
      const data = await CarsRepository.findAll();
      const count = await CarsRepository.getTotalCars();

      return {
        data,
        count,
      };
    } catch (err) {
      throw err;
    }
  }

  async get(car_id: number) {
    try {
      return await CarsRepository.find(car_id);
    } catch (err) {
      throw err;
    }
  }

  set setUser(userData: IUser) {
    this._user = userData;
  }

  get getUser() {
    return this._user;
  }
}

export default new CarsService();
