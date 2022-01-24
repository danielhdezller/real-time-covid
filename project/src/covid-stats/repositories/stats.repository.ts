import { AppBaseRepository } from "@/shared/repositories/app-base.repository";
import { EntityRepository } from "typeorm";
import { Stats } from "../entities/stats.entity";


 /**
  * Repository that works with Stats
  * @export
  * @class StatsRepository
  * @extends {AppBaseRepository<Stats>}
  */
 @EntityRepository(Stats)
 export class StatsRepository extends AppBaseRepository<Stats> {}