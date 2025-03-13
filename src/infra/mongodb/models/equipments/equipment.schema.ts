import mongoose from 'mongoose'
import { IEquipmentDoc, IEquipmentModel } from './equipment.entity'
import toJSONWithoutId from '#infra/mongodb/plugins/toJSONWithoutId/toJSONWithoutId.js'

const equipmentSchema = new mongoose.Schema<IEquipmentDoc, IEquipmentModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true
    }
  },
  {
    timestamps: true
  }
)

// add plugin that converts mongoose to json
equipmentSchema.plugin(toJSONWithoutId)

/**
 * check if the similar equipment name already exists
 * @param {string} name
 *@returns {Promise<boolean>}
 */

equipmentSchema.static(
  'isEquipmentExist',
  async function (name: string, excludeEquipmentId: mongoose.ObjectId): Promise<boolean> {
    const equipment = await this.findOne({
      name,
      _id: { $ne: excludeEquipmentId }
    })
    return !!equipment
  }
)
const Equipment = mongoose.model<IEquipmentDoc, IEquipmentModel>('Equipment', equipmentSchema)

export default Equipment
