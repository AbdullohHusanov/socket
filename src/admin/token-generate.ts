import { JwtService } from "@nestjs/jwt";
const jwtService = new JwtService
let token = jwtService.sign('Abdulloh', {privateKey: 'apple'})
function Generate(payload){
    return jwtService.sign(payload, {privateKey: 'apple'})
}
export {token, Generate}