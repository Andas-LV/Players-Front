export type Player = {
    id?: number,
    name: string, 
    full_name: string, 
    birth_date: Date, 
    age: number, 
    height_cm: number, 
    weight_kgs: number, 
    positions: string, 
    nationality: string, 
    overall_rating: number, 
    potential: number, 
    value_euro: number, 
    wage_euro: number, 
    preferred_foot: string, 
    international_reputation: number, 
    weak_foot: number, 
    skill_moves: number, 
    body_type: string, 
    release_clause_euro: number, 
    national_team: string, 
    national_rating: number, 
    national_team_position: string, 
    national_jersey_number: number, 
    crossing: number, 
    finishing: number, 
    heading_accuracy: number, 
    short_passing: number, 
    volleys: number, 
    dribbling: number, 
    curve: number, 
    freekick_accuracy: number, 
    long_passing: number, 
    ball_control: number, 
    acceleration: number, 
    sprint_speed: number, 
    agility: number, 
    reactions: number, 
    balance: number, 
    shot_power: number, 
    jumping: number, 
    stamina: number, 
    strength: number, 
    long_shots: number, 
    aggression: number, 
    interceptions: number, 
    positioning: number, 
    vision: number, 
    penalties: number, 
    composure: number, 
    marking: number, 
    standing_tackle: number, 
    sliding_tackle: number, 
    // ADDITIONALS
    favourite: boolean,
    avatar_url: string | null,
}