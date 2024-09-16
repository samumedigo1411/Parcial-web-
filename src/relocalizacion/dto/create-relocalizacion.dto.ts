import { IsNotEmpty, IsString, IsBoolean} from "class-validator";

export class CreateRelocalizacionDto {
@IsString()
@IsNotEmpty()
id:string;
@IsString()
@IsNotEmpty()
originCountry: string;
@IsString()
@IsNotEmpty()
destinationcountry: string;
@IsBoolean()
@IsNotEmpty()
succesful: boolean;
}