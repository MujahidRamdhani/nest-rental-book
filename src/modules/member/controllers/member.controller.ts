import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiExtraModels } from '@nestjs/swagger';
import { MemberService } from '../services/member.service';
import { CreateMemberDto, MemberResponseDto } from '../dtos/create.dto';

@ApiTags('Member')
@ApiExtraModels(MemberResponseDto) 
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  /**
   * @swagger
   * /member:
   *   get:
   *     summary: Retrieve all members
   *     description: Fetches a list of all registered members.
   *     tags:
   *       - Member
   *     responses:
   *       200:
   *         description: Successfully retrieved all members.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/MemberResponseDto'
   */
  @Get('/')
  @ApiOperation({ summary: 'Retrieve all members' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all members',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: { $ref: '#/components/schemas/MemberResponseDto' }
        }
      }
    }
  })
  async getAll() {
    return this.memberService.getAll();
  }

  /**
   * @swagger
   * /member/{code}:
   *   get:
   *     summary: Retrieve a member by code
   *     description: Fetches a member using their unique code.
   *     tags:
   *       - Member
   *     parameters:
   *       - in: path
   *         name: code
   *         required: true
   *         schema:
   *           type: string
   *         description: The unique code of the member.
   *     responses:
   *       200:
   *         description: Successfully retrieved member data.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/MemberResponseDto'
   */
  @Get(':code')
  @ApiOperation({ summary: 'Retrieve a member by code' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved member data',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/MemberResponseDto' }
      }
    }
  })
  async findOneByCode(@Param('code') code: string) {
    return this.memberService.findOneByCode(code);
  }

  /**
   * @swagger
   * /member:
   *   post:
   *     summary: Create a new member
   *     description: Registers a new member.
   *     tags:
   *       - Member
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateMemberDto'
   *     responses:
   *       201:
   *         description: Successfully created a new member.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/MemberResponseDto'
   */
  @Post('/')
  @ApiOperation({ summary: 'Create a new member' })
  @ApiBody({
    required: true,
    schema: { $ref: '#/components/schemas/CreateMemberDto' }
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created a new member',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/MemberResponseDto' }
      }
    }
  })
  async create(@Body() data: CreateMemberDto) {
    return this.memberService.create(data);
  }
}
