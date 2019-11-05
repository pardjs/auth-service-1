import { AuthPointController } from './auth-points.controller';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthPointName, CreateRoleDto, SetRoleAuthPointsDto } from '@pardjs/AuthPointController-service-common';
import { UsersServiceAuthPoints } from '../../BLL/auth-points/auth-points.enum';
import { DynamicRolesGuard } from '../../BLL/auth/dynamic-roles.guard';
import { RolesService } from '../../BLL/roles/roles.service';
import { RolesApiService } from './roles-api.service';
import { UpsertRoleDto } from './upsert-role.dto';

@Controller('roles')
@ApiUseTags('Roles')
export class RolesController {
    constructor(
        private readonly rolesService: RolesService,
        private readonly rolesApiService: RolesApiService,
    ) {}

    @Get('')
    @AuthPointName(UsersServiceAuthPoints.FIND_ROLES)
    @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
    @ApiBearerAuth()
    async find() {
        const result = await this.rolesService.findAndCount({
            where: {
                shownInApp: true,
            },
            select: ['id', 'name', 'createdAt', 'updatedAt'],
        });
        return { data: result[0], count: result[1] };
    }

    @Get(':id')
    @AuthPointName(UsersServiceAuthPoints.FIND_ROLE)
    @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
    @ApiBearerAuth()
    async findById(@Param('id') id: number) {
        return this.rolesService.findByIdDetail(id);
    }

    @Post('')
    @AuthPointName(UsersServiceAuthPoints.FIND_ROLES)
    @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
    @ApiBearerAuth()
    async create(@Body() data: CreateRoleDto) {
        const role = await this.rolesService.create(data.name);
        return role;
    }

    @Put(':id')
    @AuthPointName(UsersServiceAuthPoints.FIND_ROLES)
    @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
    @ApiBearerAuth()
    async update(@Param('id') id: number, @Body() data: UpsertRoleDto) {
        return this.rolesService.update(id, data.name);
    }

    @Put(':id/auth-points')
    @AuthPointName(UsersServiceAuthPoints.FIND_ROLES)
    @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
    @ApiBearerAuth()
    async setRoleAuthPoints(@Param('id') id: number, @Body() data: SetRoleAuthPointsDto) {
        return this.rolesApiService.setRoleAuthPoints(id, data);
    }

    @Delete(':id')
    @AuthPointName(UsersServiceAuthPoints.FIND_ROLES)
    @UseGuards(AuthGuard('jwt'), DynamicRolesGuard)
    @ApiBearerAuth()
    async remove(@Param('id') id: number) {
        return this.rolesService.remove(id);
    }
}
