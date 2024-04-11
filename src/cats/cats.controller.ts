import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Cat } from './cat.entity';
import { UpdateCatDto } from './dto/update-cat.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @Roles(['admin'])
  @ApiBearerAuth()
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }


  @ApiBearerAuth()
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('favorite')
  @ApiBearerAuth()
  async getFavorites(@Req() req){
    return this.userService.getFavorites(req.user.id);
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ) {
    const cat = this.catsService.findOne(id);
    if (!cat) {
      throw new NotFoundException('Cat not found');
    }
    return cat ;
  }

  @Put(':id')
  @Roles(['admin'])
  @ApiBearerAuth()
  async update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(id, updateCatDto)
  }


  @Delete(':id')
  @Roles(['admin'])
  @ApiBearerAuth()
  async remove(@Param('id') id: number) {
    return this.catsService.remove(id);
  }

  private async getUserAndCat(id: number, userId: number): Promise<[User, Cat]> {
    const [user, cat] = await Promise.all([
      this.userService.findOne(userId),
      this.catsService.findOne(id),
    ]);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!cat) {
      throw new NotFoundException('Cat not found');
    }

    return [user, cat];
  }


  @ApiBearerAuth()
  @Post(':id/favorite')
  async addToFavorites(@Param('id') id: number, @Req() req) {
    const [user, cat] = await this.getUserAndCat(id, req.user.id);
    return this.userService.addToFavorites(user, cat)
  }

  @ApiBearerAuth()
  @Delete(':id/favorite')
  async removeFromFavorites(@Param('id') id: number, @Req() req) {
    const [user, cat] = await this.getUserAndCat(id, req.user.id);
    return this.userService.removeFromFavorites(user, cat);
  }



}
